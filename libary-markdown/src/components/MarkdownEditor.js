import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// marked libary qui permet la convertion
import { marked } from 'marked';

const MarkdownEditor = () => {
    const { fileId } = useParams();
    const [content, setContent] = useState('');

    // Gestion de l'importation de fichiers Markdown
    const handleFileImport = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setContent(e.target.result);
        };
        reader.readAsText(file);
        }
    };

    // Formatage du texte en fonction du style (gras ou italique)
    const formatText = (style) => {
        let formattedText;
        if (style === 'bold') {
            formattedText = `**${content}**`;
        } else if (style === 'italic') {
            formattedText = `*${content}*`;
        }
        setContent(formattedText);
    };

    // Exporter le contenu du fichier sous forme de fichier Markdown
    const exportFile = (fileName) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = `${fileName}.md`;
        document.body.appendChild(element);
        element.click();
    };
    // Utilisation de la fonction setContent pour mettre à jour la valeur de las const content
    // Elle prends en params un event (entré utilisateur) 
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

  return (
    <div>
      {/* Zone d'import de nos fichier perso */}
      <input type="file" accept=".md" onChange={handleFileImport} />
      {/* Création d'un editeur avec la balise textarea */}
      <h1>Éditeur Markdown pour le Fichier {fileId}</h1>
      <textarea 
        value={content} 
        onChange={handleContentChange} 
        rows="10" 
        cols="50" 
        placeholder="Écris ton Markdown ici..."
      />
      {/* Ici nous ajoutons des petites options d'edition */}
    <button onClick={() => formatText('bold')}>Bold</button>
    <button onClick={() => formatText('italic')}>Italic</button>

      <h2>Prévisualisation</h2>
      {/* dangerouslySetInnerHTML pour insérer du contenu HTML directement dans le DOM */}
      <div 
        dangerouslySetInnerHTML={{ __html: marked(content) }} 
      />
      {/* Ici un btn pour pouvoir exporter notre fichier apres une petite visualisation */}
      <button onClick={() => exportFile(fileId)}>Exporter</button>
    </div>
  );
};

export default MarkdownEditor;
