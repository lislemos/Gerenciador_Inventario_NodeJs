import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import './ProdutoDetalhesPage.css';

const ProdutoDetalhesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
   
  const [produto, setProduto] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState('');

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = async () => {
    try {
        const prodRes = await api.get(`/produtos/${id}`);
        setProduto(prodRes.data);
        const avRes = await api.get(`/avaliacoes/${id}`);
        setAvaliacoes(avRes.data);
    } catch (error) {
        console.error("Erro ao carregar dados");
    }
  };

  const enviarAvaliacao = async (e) => {
    e.preventDefault();
    try {
        await api.post('/avaliacoes', {
            produto_id: id,
            nota: novaNota,
            comentario: novoComentario
        });
        alert('Avaliação enviada!');
        setNovoComentario('');
        carregarDados(); 
    } catch (error) {
        alert('Erro ao enviar avaliação.');
    }
  };

  const deletarProduto = async () => {
    if (confirm('Tem certeza que deseja excluir?')) {
      try {
        await api.delete(`/produtos/${id}`);
        navigate('/');
      } catch (error) {
        alert('Erro ao deletar.');
      }
    }
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        
        <div className="details-box">
          <div className="details-image-container">
            <img src={produto.imagem_url || 'https://via.placeholder.com/400'} alt={produto.nome} className="details-img" />
          </div>

          <div className="details-info-container">
            <h1>{produto.nome}</h1>
            <span className="category-tag">{produto.categoria}</span>

            <div className="rating-big">
               {'★'.repeat(Math.round(produto.nota)) + '☆'.repeat(5 - Math.round(produto.nota))}
               <span className="rating-number">
                    ({produto.nota ? parseFloat(produto.nota).toFixed(1) : '0.0'})
               </span>
            </div>

            <p className="price-big">R$ {parseFloat(produto.preco).toFixed(2)}</p>
            <p>{produto.descricao}</p>

            {user?.perfil === 'admin' && (
                <div className="admin-buttons">
                  <Link to={`/editar/${produto.id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>Editar</Link>
                  <button onClick={deletarProduto} className="btn btn-danger">Excluir</button>
                </div>
            )}
          </div>
        </div>

        <div className="reviews-section">
            <h2>Avaliações dos Usuários</h2>

            <div className="review-form-box">
                <h4>Deixe sua opinião</h4>
                <form onSubmit={enviarAvaliacao}>
                    <div className="review-input-group">
                        <label>Nota: </label>
                        <select value={novaNota} onChange={(e) => setNovaNota(e.target.value)} className="review-select">
                            <option value="5">5 - Excelente</option>
                            <option value="4">4 - Muito Bom</option>
                            <option value="3">3 - Bom</option>
                            <option value="2">2 - Ruim</option>
                            <option value="1">1 - Péssimo</option>
                        </select>
                    </div>
                    <textarea 
                        placeholder="O que achou do produto?" 
                        value={novoComentario}
                        onChange={(e) => setNovoComentario(e.target.value)}
                        className="review-textarea"
                        rows="3"
                    />
                    <button type="submit" className="btn btn-success">Enviar Avaliação</button>
                </form>
            </div>

            <div>
                {avaliacoes.length > 0 ? (
                    avaliacoes.map((av) => (
                        <div key={av.id} className="review-card">
                            <div className="review-header">
                                <strong>{av.usuario_nome}</strong>
                                <span className="review-stars">{'★'.repeat(av.nota)}</span>
                            </div>
                            <p className="review-text">"{av.comentario}"</p>
                            <small className="review-date">{new Date(av.data_criacao).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>Este produto ainda não tem avaliações. Seja o primeiro!</p>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default ProdutoDetalhesPage;