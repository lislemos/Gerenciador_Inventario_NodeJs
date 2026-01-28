const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    const tokenSemBearer = token.split(' ')[1]; 

    jwt.verify(tokenSemBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        req.userPerfil = decoded.perfil;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.userPerfil !== 'admin') {
        return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }
    next();
};