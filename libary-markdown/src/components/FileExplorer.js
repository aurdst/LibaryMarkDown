import React, { useState, useEffect } from 'react';
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
  

// Partie navigation de dossier fichiers
const FileExplorer = () => {
    // declaration de la structure
    const [fileStructure, setFileStructure] = useState(initialFileStructure);

    // Pour sauvegarder notre structure de fichier dossier nous utilisons le localStorage
    useEffect(() => {
        localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
    }, [fileStructure]);
    
    // Au démarrage nous regardons dans le local storage si une structure existe deja afin de la recup et l'use
    useEffect(() => {
        const savedStructure = localStorage.getItem('fileStructure');
        if (savedStructure) {
        setFileStructure(JSON.parse(savedStructure));
        }
    }, []);

// Methode d'ajout de fichier
    const addFile = (folderId, newFileName) => {
    // Trouver le dossier cible
        const folder = findFolderById(folderId, fileStructure);
        // Créer un nouvel objet fichier
        const newFile = {
        id: generateUniqueId(),
        name: newFileName,
        type: 'file',
        };
        // Ajouter le fichier au dossier
        folder.children.push(newFile);
        setFileStructure([...fileStructure]);
    };

    // Methode d'ajout d'un dossier
    const addFolder = (parentFolderId, newFolderName) => {
        const folder = findFolderById(parentFolderId, fileStructure);
        const newFolder = {
            id: generateUniqueId(),
            name: newFolderName,
            type: 'folder',
            children: [],
        };
        folder.children.push(newFolder);
        setFileStructure([...fileStructure]);
    };

    // Renomer un fichier ou dossier 
    const renameItem = (itemId, newName) => {
        const item = findItemById(itemId, fileStructure);
        item.name = newName;
        setFileStructure([...fileStructure]);
    };

    // Delete un fichier ou dossier 
    const deleteItem = (itemId) => {
        const updatedStructure = removeItemById(itemId, fileStructure);
        setFileStructure(updatedStructure);
    };

    const renderFileStructure = (structure) => {
        return structure.map(item => (
            <li key={item.id}>
                {item.type === 'file' ? (
                    <Link to={`/editor/${item.id}`}>{item.name}</Link>
                ) : (
                    <>
                        <strong>{item.name}</strong>
                        <ul>{renderFileStructure(item.children)}</ul>
                    </>
                )}
                <button onClick={() => renameItem(item.id, prompt("Nouveau nom :"))}>Renommer</button>
                <button onClick={() => deleteItem(item.id)}>Supprimer</button>
            </li>
        ));
    };
    
  return (
    <div>
        <h1>Arborescence des Fichiers</h1>
        <ul>
            {renderFileStructure(fileStructure)}
        </ul>
        <button onClick={() => addFolder('root', 'Nouveau Dossier')}>Nouveau Dossier</button>
        <button onClick={() => addFile('root', 'Nouveau Fichier.md')}>Nouveau Fichier</button>
    </div>
  );
};

const findFolderById = (id, structure) => {
    for (let item of structure) {
        if (item.id === id && item.type === 'folder') {
            return item;
        }
        if (item.children) {
            const found = findFolderById(id, item.children);
            if (found) return found;
        }
    }
    return null;
};

const findItemById = (id, structure) => {
    for (let item of structure) {
        if (item.id === id) {
            return item;
        }
        if (item.children) {
            const found = findItemById(id, item.children);
            if (found) return found;
        }
    }
    return null;
};

const removeItemById = (id, structure) => {
    return structure.filter(item => {
        if (item.id === id) return false;
        if (item.children) {
            item.children = removeItemById(id, item.children);
        }
        return true;
    });
};

const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export default FileExplorer;