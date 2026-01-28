const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const usuario = rows[0];

        if (senha !== usuario.senha) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }
       
        const token = jwt.sign(
            { id: usuario.id, perfil: usuario.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login realizado com sucesso',
            token,
            usuario: { 
                nome: usuario.nome,
                perfil: usuario.perfil
            }
        });

    } catch (error) {
        console.error("ERRO DETALHADO NO LOGIN:", error); 
        
        res.status(500).json({ message: 'Erro no servidor' });
    }
};