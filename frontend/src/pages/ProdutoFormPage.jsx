import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import './ProdutoFormPage.css';

const ProdutoFormPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
   
const [form, setForm] = useState({
    nome: '', descricao: '', preco: '', categoria: '', nota: 5, imagem_url: '', quantidade: 0
});

  useEffect(() => {
    if (id) {
      api.get(`/produtos/${id}`).then(response => {
        setForm(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/produtos/${id}`, form); 
      } else {
        await api.post('/produtos', form); 
      }
      navigate('/'); 
    } catch (error) {
      alert('Erro ao salvar produto.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>{id ? 'Editar Produto' : 'Novo Produto'}</h2>
        <form onSubmit={handleSubmit} className="form-container">
           
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required className="input-bonito" />
          <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} className="input-bonito" />
          <input name="preco" type="number" step="0.01" placeholder="Preço" value={form.preco} onChange={handleChange} required className="input-bonito" />
          <input name="quantidade" type="number" placeholder="Qtd em Estoque" value={form.quantidade} onChange={handleChange} required className="input-bonito" />
          

          <select name="categoria" value={form.categoria} onChange={handleChange} required className="input-bonito select-bg-white">
              <option value="">Selecione uma Categoria</option>
              <option value="Eletronicos">Eletrônicos</option>
              <option value="Moveis">Móveis</option>
              <option value="Roupas">Roupas</option>
              <option value="Gamer">Gamer</option>
              <option value="Gato">Gato</option>
              <option value="Outros">Outros</option>
          </select>

          <input name="imagem_url" placeholder="URL da Imagem (Link)" value={form.imagem_url} onChange={handleChange} className="input-bonito" />
           
          <button type="submit" className="btn btn-success">Salvar</button>
        </form>
      </div>
    </>
  );
};

export default ProdutoFormPage;