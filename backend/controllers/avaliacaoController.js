const db = require('../config/db');

exports.adicionarAvaliacao = async (req, res) => {
    const { produto_id, nota, comentario } = req.body;
    const usuario_id = req.userId; 

    try {
        await db.execute(
            'INSERT INTO avaliacoes (produto_id, usuario_id, nota, comentario) VALUES (?, ?, ?, ?)',
            [produto_id, usuario_id, nota, comentario]
        );

        const [rows] = await db.execute(
            'SELECT AVG(nota) as media FROM avaliacoes WHERE produto_id = ?', 
            [produto_id]
        );
        
        const novaMedia = rows[0].media || nota;
        await db.execute(
            'UPDATE produtos SET nota = ? WHERE id = ?',
            [novaMedia, produto_id]
        );

        res.status(201).json({ message: 'Avaliação enviada e média atualizada!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao avaliar.' });
    }
};

exports.listarAvaliacoesPorProduto = async (req, res) => {
    const { produtoId } = req.params;
    try {
        const [avaliacoes] = await db.execute(`
            SELECT a.*, u.nome as usuario_nome 
            FROM avaliacoes a
            JOIN usuarios u ON a.usuario_id = u.id
            WHERE a.produto_id = ?
            ORDER BY a.data_criacao DESC
        `, [produtoId]);

        res.json(avaliacoes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar avaliações.' });
    }
};