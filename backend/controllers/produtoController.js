const db = require('../config/db');

exports.listarProdutos = async (req, res) => {
    const { busca, categoria, ordem, nota } = req.query;

    try {
        let sql = 'SELECT * FROM produtos WHERE 1=1';
        let params = [];

        if (busca) {
            sql += ' AND nome LIKE ?';
            params.push(`%${busca}%`); 
        }

        if (categoria) {
            sql += ' AND categoria = ?';
            params.push(categoria);
        }

        if (nota) {
            sql += ' AND nota >= ?';
            params.push(nota);
        }

        if (ordem === 'preco_menor') {
            sql += ' ORDER BY preco ASC';
        } else if (ordem === 'preco_maior') {
            sql += ' ORDER BY preco DESC';
        } else if (ordem === 'nome') {
            sql += ' ORDER BY nome ASC';
        }

        const [produtos] = await db.execute(sql, params);
        
        res.json(produtos);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

exports.buscarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [produto] = await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
        if (produto.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};

exports.criarProduto = async (req, res) => {
    const { nome, descricao, preco, categoria, nota, imagem_url } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO produtos (nome, descricao, preco, categoria, nota, imagem_url) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, descricao, preco, categoria, nota, imagem_url]
        );
        res.status(201).json({ message: 'Produto criado!', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
};

exports.atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoria, nota, imagem_url } = req.body;
    try {
        await db.execute(
            'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ?, nota = ?, imagem_url = ? WHERE id = ?',
            [nome, descricao, preco, categoria, nota, imagem_url, id]
        );
        res.json({ message: 'Produto atualizado!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
};

exports.deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
        res.json({ message: 'Produto removido!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
};