import { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [produtos, setProdutos] = useState([]);
  const { user } = useContext(AuthContext);
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroNota, setFiltroNota] = useState('');
  const [ordem, setOrdem] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, [busca, filtroCategoria, ordem, filtroNota]); 

  const carregarProdutos = async () => {
    try {
      const response = await api.get('/produtos', {
        params: { busca, categoria: filtroCategoria, ordem, nota: filtroNota }
      });
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao listar", error);
    }
  };

  const deletarProduto = async (id, e) => {
    e.preventDefault(); 
    if (confirm('Tem certeza que deseja excluir?')) {
      try {
        await api.delete(`/produtos/${id}`);
        carregarProdutos();
      } catch (error) {
        alert('Erro ao deletar (talvez você não seja admin?)');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="filters-container">
            <div className="filters-wrapper">
                <input 
                    type="text" 
                    placeholder="Buscar produto..." 
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="search-input"
                />

                <div className="filters-group">
                    <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="filter-select">
                        <option value="">Todas as Categorias</option>
                        <option value="Eletronicos">Eletrônicos</option>
                        <option value="Moveis">Móveis</option>
                        <option value="Roupas">Roupas</option>
                        <option value="Gamer">Gamer</option>
                        <option value="Gato">Gato</option>
                        <option value="Outros">Outros</option>
                    </select>

                    <select value={filtroNota} onChange={(e) => setFiltroNota(e.target.value)} className="filter-select">
                        <option value="">Todas Avaliações</option>
                        <option value="5">★★★★★ (5)</option>
                        <option value="4">★★★★☆ (4+)</option>
                        <option value="3">★★★☆☆ (3+)</option>
                        <option value="2">★★☆☆☆ (2+)</option>
                    </select>

                    <select value={ordem} onChange={(e) => setOrdem(e.target.value)} className="filter-select">
                        <option value="">Ordenar por...</option>
                        <option value="preco_menor">Menor Preço</option>
                        <option value="preco_maior">Maior Preço</option>
                        <option value="nome">Nome (A-Z)</option>
                    </select>
                </div>

                {user?.perfil === 'admin' && (
                    <Link to="/novo" className="btn btn-success" style={{ textDecoration: 'none' }}>+ Novo</Link>
                )}
            </div>
        </div>

        <div className="grid">
          {produtos.length > 0 ? (
            produtos.map((prod) => (
                <div key={prod.id} className="card card-relative">
                    <Link to={`/produto/${prod.id}`} className="card-link">
                        <img src={prod.imagem_url || 'https://via.placeholder.com/150'} alt={prod.nome} />
                        <div className="card-body">
                            <h3>{prod.nome}</h3>
                            <p className="card-category">{prod.categoria}</p>
                            <div className="rating-stars">
                                {'★'.repeat(Math.round(prod.nota)) + '☆'.repeat(5 - Math.round(prod.nota))}
                            </div>
                            <p className="price">{formatarMoeda(prod.preco)}</p>
                            <p className="estoque-info">
    {prod.quantidade > 0 ? `Restam: ${prod.quantidade}` : 'ESGOTADO ❌'}
</p>
                        </div>
                    </Link>

                    {user?.perfil === 'admin' && (
                        <div className="admin-actions">
                            <Link to={`/editar/${prod.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>Editar</Link>
                            <button onClick={(e) => deletarProduto(prod.id, e)} className="btn btn-danger btn-sm">Excluir</button>
                        </div>
                    )}
                </div>
            ))
          ) : (
              <p className="empty-msg">Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;