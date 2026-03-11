import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Exemple de requête GET
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Exemple de requête POST
  const createPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'Nouveau post',
        body: 'Contenu du post',
        userId: 1
      });
      console.log('Post créé:', response.data);
      alert('Post créé avec succès !');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Exemple de requête PUT
  const updatePost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
        title: 'Post mis à jour',
        body: 'Contenu modifié',
        userId: 1
      });
      console.log('Post mis à jour:', response.data);
      alert('Post mis à jour avec succès !');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Exemple de requête DELETE
  const deletePost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
      console.log('Post supprimé');
      alert('Post supprimé avec succès !');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Démonstration Axios</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchData} disabled={loading}>
          GET - Récupérer des données
        </button>
        <button onClick={createPost} disabled={loading} style={{ marginLeft: '10px' }}>
          POST - Créer un post
        </button>
        <button onClick={updatePost} disabled={loading} style={{ marginLeft: '10px' }}>
          PUT - Mettre à jour
        </button>
        <button onClick={deletePost} disabled={loading} style={{ marginLeft: '10px' }}>
          DELETE - Supprimer
        </button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      
      {data && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
          <small>User ID: {data.userId}</small>
        </div>
      )}
    </div>
  );
}

export default AxiosDemo;
