const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const produtoController = require('../controllers/produtoController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const avaliacaoController = require('../controllers/avaliacaoController');

router.post('/login', authController.login);

router.get('/produtos', verifyToken, produtoController.listarProdutos);
router.get('/produtos/:id', verifyToken, produtoController.buscarProdutoPorId);

router.post('/produtos', verifyToken, isAdmin, produtoController.criarProduto);
router.put('/produtos/:id', verifyToken, isAdmin, produtoController.atualizarProduto);
router.delete('/produtos/:id', verifyToken, isAdmin, produtoController.deletarProduto);

router.post('/avaliacoes', verifyToken, avaliacaoController.adicionarAvaliacao);
router.get('/avaliacoes/:produtoId', verifyToken, avaliacaoController.listarAvaliacoesPorProduto);

module.exports = router;