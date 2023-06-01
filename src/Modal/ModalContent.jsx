import "./Modal.css"
import "../data/estudiantes.js"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import estudiantes from "../data/estudiantes.js";

let url = "https://jsonplaceholder.typicode.com/users"
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch (error => console.log(error))

export default function ModalContent({ onClose }) {
  return (
    <div className="modal">


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombres y apellidos</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Sede</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {estudiantes.map(celda => (
              <TableRow>
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