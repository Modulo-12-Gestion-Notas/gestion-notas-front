import "./Modal.css"
import "../data/estudiantes.js"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import estudiantes from "../data/estudiantes.js";

let numberGroup = estudiantes.findIndex(estudianteN => estudianteN.numero = estudiantes.numeroGrupo)

export default function ModalContent({ onClose }) {
  return (
    <div className="modal">


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Nombres y apellidos</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Sede</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {estudiantes.map(celda => (
              <TableRow>
                <TableCell>{celda.numero}</TableCell>
                <TableCell>{celda.id}</TableCell>
                <TableCell>{celda.nombresYApellidos}</TableCell>
                <TableCell>{celda.email}</TableCell>
                <TableCell>{celda.sede}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <div className="closeContainer">
        <button onClick={onClose} className="closeButton">X</button>
      </div>
    </div>
  );
}