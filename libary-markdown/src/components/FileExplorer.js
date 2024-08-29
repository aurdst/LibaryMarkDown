import React from 'react';
import { Link } from 'react-router-dom';

// Exemple de structure de données pour le début 
// un id, un nom de dossier/fichier et son type afin de les différencier facilement 
const initialFileStructure = [
    {
      id: 'root',
      name: 'Root',
      type: 'folder',
      children: [
        {
          id: '1',
          name: 'Fichier 1.md',
          type: 'file',
        },
        {
          id: '2',
          name: 'Dossier 1',
          type: 'folder',
          children: [
            {
              id: '3',
              name: 'Fichier 2.md',
              type: 'file',
            },
          ],
        },
      ],
    },
  ];
  


const FileExplorer = () => {
  return (
    <div>
      <h1>Arborescence des Fichiers</h1>
      {/* Exemple de fichiers statiques, à remplacer par de vrais dossiers/fichiers */}
      <ul>
        <li>
          <Link to="/editor/1">Fichier 1.md</Link>
        </li>
        <li>
          <Link to="/editor/2">Fichier 2.md</Link>
        </li>
        <li>
          <Link to="/editor/3">Fichier 3.md</Link>
        </li>
      </ul>
    </div>
  );
};

export default FileExplorer;
