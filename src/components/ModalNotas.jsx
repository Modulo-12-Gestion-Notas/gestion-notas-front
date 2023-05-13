import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAceptar from "./ModalAceptar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  cargarEstudiantes,
  guardarNotasEstudiantes,
  cargarEstudiantesNotas,
} from "../services/GrupoService";

const ModalNotas = ({ idGrupo }) => {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      await cargarEstudiantes(
        idGrupo,
        (response) => {
          setRows(response.data.estudianteList);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchEstudiantes();
  }, []);

  const addRow = () => {
    const newRow = {
      id: null,
      concepto: "",
      porcentaje: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index, notasAsociadas) => {
    if (notasAsociadas === true) {
      alert("La actividad cuenta con notas asociadas");
      return;
    } else {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleChange = (event, index, key) => {
    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    setRows(newRows);
  };

  const saveRows = async () => {
    const codigoGrupo = idGrupo; // Valor de ejemplo, puedes cambiarlo por una variable de estado si lo necesitas
    const grupo = { codigoGrupo };
    const updatedRows = rows.map((row) => ({ ...row, grupo: grupo }));
    //const data = { notas: updatedRows };
    const jsondata = JSON.stringify(updatedRows);
    //const data = { rows };
    await guardarNotasEstudiantes(
      idGrupo,
      jsondata,
      (response) => {
        console.log(response.data);
        toast.success("actividad agregada con éxito");
      },
      (error) => {
        toast.error("Error guardando la actividad");
        console.error(error);
      }
    );
  };
  const validarPorcentaje = (valor) => {
    if (valor > 100 || valor < 0) {
      toast.warn(`el porcentaje ingresado de ${valor} no es permitido`);
    }
  };

  return (
    <>
      <Button className="btn btn-info" onClick={handleShow}>
        Ver Estudiantes
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ESTUDIANTES DEL GRUPO {idGrupo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />
          <table>
            <thead>
              <tr>
                <th style={{ display: "none" }}>Id</th>
                <th>numero documento</th>
                <th>nombre</th>
                <th>correo</th>
                <th>seccional</th>
                <th>nota1</th>
                <th>nota2</th>
                <th>nota3</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={{ display: "none" }}>
                    <input
                      type="number"
                      value={row.id ? row.id : null}
                      onChange={(event) => handleChange(event, index, "id")}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.numDocumento}
                      onChange={(event) =>
                        handleChange(event, index, "numDocumento")
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.nombre + " " + row.apellido}
                      onChange={(event) => {
                        handleChange(event, index, "nombre");
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.correoInstitucional}
                      onChange={(event) => {
                        handleChange(event, index, "correoInstitucional");
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.seccional}
                      onChange={(event) => {
                        handleChange(event, index, "seccional");
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <ModalAceptar
            functionAcept={saveRows}
            legendButton={"Guardar"}
            message={`¿Desea Guardar los cambios en las actividades?`}
            heading={"Guardar Actividad"}
            confirmationButon={"Guardar"}
            cancelButton={"Cancelar"}
            colorButtonModal={"green"}
            colorButton={"blue"}
            buttonDisable={false}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNotas;
