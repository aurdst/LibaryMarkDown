import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MarkdownEditor = () => {
  const { fileId } = useParams();
  const [content, setContent] = useState('');
// Utilisation de la fonction setContent pour mettre à jour la valeur de las const content
// Elle prends en params un event (entré utilisateur) 
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      vèu _i-tutfolgoçlv-o_kfo;ikgfèo_dèi{/* Création d'un editeur avec la balise textarea */}
      <h1>Éditeur Markdown pour le Fichier {fileId}</h1>
      <textarea 
        value={content} 
        onChange={handleContentChange} 
        rows="10" 
        cols="50" 
        placeholder="Écris ton Markdown ici..."
      />
      <h2>Prévisualisation</h2>
      {/* dangerouslySetInnerHTML pour insérer du contenu HTML directement dans le DOM */}
      <div 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};

export default MarkdownEditor;
