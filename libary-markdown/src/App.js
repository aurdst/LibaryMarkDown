import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileExplorer from './components/FileExplorer';
import MarkdownEditor from './components/MarkdownEditor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          // Declaration de la route FileExplorer avec son composant
          <Route path="/" element={<FileExplorer />} />
          // Declaration de la route MarkdownEditor avec son composant
          <Route path="/editor/:fileId" element={<MarkdownEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
