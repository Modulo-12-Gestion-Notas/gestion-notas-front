import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {cargarEstudianteInfo} from './../services/GrupoService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const GestionEstudiantes = () => {
    
    const [idEstudiante, setIdEstudiante] = useState('');
    const [infoEstudiante, setInfoEstudiante] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState('1');
    

        const fetchInfoEstudiante = async (id) => {
          await cargarEstudianteInfo(
            id,
            (response) => {
                setInfoEstudiante(response.data);
              
            },
            (error) => {
              console.error(error);
            }
          );
        };

    
    const handleChangeAcordeon = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
      console.log(infoEstudiante)
      function createData(index,actividad, nota, porcentaje) {
        console.log(actividad)
        console.log(nota ? nota : 'sin nota')
        console.log(porcentaje)
        return { index,actividad, nota, porcentaje};
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0 ),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Eclair', 262, 16.0),
        createData('Cupcake', 305, 3.7),
        createData('Gingerbread', 356, 16.0),
      ];
      
      const acordeonNotas= () =>{
        const acordion = [];
        const notasPorcentaje = []
        for (let index = 0; index < (infoEstudiante.grupos)?.length; index++) {
          (infoEstudiante.grupos[index].evaluaciones).map((e)=>{notasPorcentaje.push(createData(index,e.concepto,((infoEstudiante.grupos[index].notas.calificaciones).filter(calificacion => calificacion.evaluacion.id == e.id)[0])?.calificacion,e.porcentaje))})
          acordion.push(<Accordion expanded={expanded === `panel${index}`} onChange={handleChangeAcordeon(`panel${index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {infoEstudiante?.grupos[index].curso.nombreCurso+'-'+infoEstudiante?.grupos[index].curso.codigoCurso}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{infoEstudiante?.grupos[index].nombreGrupo+" "+infoEstudiante?.grupos[index].periodoAcademico.nombre}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <div className="d-flex flex-column justify-content-between">
              <div>
                <label htmlFor="docente">docente: </label><input type="text" id="docente" value={infoEstudiante?.grupos[index].profesor.nombre+" "+infoEstudiante?.grupos[index].profesor.apellido} disabled/>
              </div>
              <div>
              <div>
                <label htmlFor="docente">correo: </label><input type="text" id="docente" value={infoEstudiante?.grupos[index].profesor.correoInstitucional} disabled/>
              </div>
              </div>
              <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Actividad</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Porcentaje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(notasPorcentaje.filter(notaPorcentaje => notaPorcentaje?.index === index)).map((row) => (
              <TableRow
                key={row.actividad}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {row.actividad}
                </TableCell>
                <TableCell >{row.nota}</TableCell>
                <TableCell >{row.porcentaje}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex  flex-row my-2">
        <div className="mx-2"><label htmlFor="">Porcentaje evaluado: </label><input type="text" value={(infoEstudiante?.grupos[index].notas.porcentajeEvaluado)?(infoEstudiante?.grupos[index].notas.porcentajeEvaluado)+"%":'sin porcentajes'} disabled/></div>
        <div className="mx-2"><label htmlFor="">Nota acumulada: </label><input type="text" value={(infoEstudiante?.grupos[index].notas.notaAcumulada)?(infoEstudiante?.grupos[index].notas.notaAcumulada) : 'sin notas'} disabled/></div>
        <div className="mx-2"><label htmlFor="">Nota definitiva: </label><input type="text" value={(infoEstudiante?.grupos[index].notas.notaDefinitiva)?(infoEstudiante?.grupos[index].notas.notaDefinitiva) :'sin nota'} disabled/></div>
      </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>)
          
        }
        return acordion
      }

      
  return (
    <>
    <div>
    <h2 className="text-center">Notas Acádemicas</h2>
          <div className="row text justify-content align-items-center">
            <div className="col-md-4 mb-3">
              <label htmlFor="idProfesor">ID de Estudiante:</label>
                <input
                  type="text"
                  className="form-control"
                  id="idProfesor"
                 onChange={(e)=>setIdEstudiante(e.target.value)}
                
                />
            </div>
            <div className="col-md-1 ">
              <button className="btn btn-primary" onClick={(e)=>fetchInfoEstudiante(idEstudiante)} >
                Buscar
              </button>
            </div>
          </div>
    </div>
    <div>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Estudiante" value="1" />
            <Tab label="Cursos" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <div className='d-flex flex-column justify-content-between'>
            <label htmlFor="docE">Numero de documento :</label><input type="text" id='docE' value={infoEstudiante?.estudiante?.numDocumento} disabled/>
            <label htmlFor="nombE">Nombre :</label><input type="text" id='nombE' value={(infoEstudiante?.estudiante?.nombre ? infoEstudiante?.estudiante?.nombre : "")  +' '+ (infoEstudiante?.estudiante?.apellido ? infoEstudiante?.estudiante?.apellido : "")} disabled/>
            <label htmlFor="emailE">Correo :</label><input type="text"  id='emailE' value={infoEstudiante?.estudiante?.correoInstitucional} disabled/>
            <label htmlFor="secE">Seccional :</label><input type="text" id='secE' value={infoEstudiante?.estudiante?.seccional} disabled/>
            </div>
        </TabPanel>
        <TabPanel value="2">
        <div>
        {acordeonNotas()}
      </div>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
    </>
  )
}

export default GestionEstudiantes