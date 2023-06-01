import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ListGrupoComponent from './components/ListGrupoComponent';
import GestionEstudiantes from './components/GestionEstudiantes';

function App() {
  return (
    <div class Name="container">
       <Router>
      <Routes>
        <Route path="/" element={<ListGrupoComponent />} />
      </Routes>
      <Routes>
        <Route path="/Estudiante" element={<GestionEstudiantes />} />
      </Routes>
    </Router>
      {/*<GestionEstudiantes/>*/}
      {/*<ListGrupoComponent/>*/}
    </div>
  );
}

export default App;
