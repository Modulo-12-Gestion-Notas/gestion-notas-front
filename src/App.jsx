import './App.css'
import { useState } from 'react';
import GroupButton from './components/GroupButton'
import estudiantes from './data/estudiantes'
function App() {

  const [showModal, setShowModal] = useState(false);
  const listaEstudiantes = estudiantes.map(e => {
    return <GroupButton numeroGrupo={e.numero}/>
  })

  return (

    <div>
      <header>
        <h1 className='titleColor'>Mis grupos asignados</h1>
      </header>
      {listaEstudiantes}
      
      
    </div>

  )
}

export default App
