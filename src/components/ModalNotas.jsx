import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAceptar from "./ModalAceptar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  guardarNotasEstudiantes,
  cargarEstudiantesNotas,
} from "../services/GrupoService";

const ModalNotas = ({ idGrupo }) => {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [rows, setRows] = useState([]);
  const [EvaluacionList, setEvaluacionList] = useState([]);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);

  useEffect(() => {
    const fetchEstudiantesAndEvaluaciones = async () => {
      await Promise.all([fetchEstudiantes(), fetchEvaluaciones()]);
    };
    
    const fetchEstudiantes = async () => {
      await cargarEstudiantesNotas(
        idGrupo,
        (response) => {
          const estudiantes = response.data.estudiantes;
          const evaluaciones = response.data.evaluaciones;
  
          console.log("Estudiantes:", estudiantes);
          console.log("Evaluaciones:", evaluaciones);
  
          const updatedRows = estudiantes.map((estudiante) => ({
            ...estudiante,
            notas: evaluaciones.map((evaluacion) => {
              const nota = estudiante.notas.find(
                (nota) => nota.idActividadEvaluativa === evaluacion.id
              );
              return nota ? nota.calificacion : "";
            }),
          }));
  
          setRows(updatedRows);
        },
        (error) => {
          console.error(error);
        }
      );
    };
  
    const fetchEvaluaciones = async () => {
      await cargarEstudiantesNotas(
        idGrupo,
        (response) => {
          setEvaluacionList(response.data.evaluaciones);
        },
        (error) => {
          console.error(error);
        }
      );
    };
  
    fetchEstudiantesAndEvaluaciones();
  }, []);

  useEffect(() => {
    // Verificar si hay algún número inválido en las notas
    const hasInvalidNumber = rows.some((row) => {
      return row.notas.some((nota) => nota < 0 || nota > 5);
    });

    setIsGuardarDisabled(hasInvalidNumber);
  }, [rows]);
  
  const handleChange = (event, index, key) => {
    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    setRows(newRows);
  };

  const handleNotaChange = (event, estudianteIndex, evaluacionIndex) => {
    const newRows = [...rows];
    newRows[estudianteIndex].notas[evaluacionIndex] = event.target.value;
    setRows(newRows);
  };

  const saveRows = async () => {
    const codigoGrupo = idGrupo; // Valor de ejemplo, puedes cambiarlo por una variable de estado si lo necesitas
    const updatedRows = rows.map((row) => ({
      notas: EvaluacionList.map((evaluacion) => {
        if (row.notas.calificacion) {
          return {
            id: row.notas.id,
            calificacion: row.notas.calificacion,
            idEstudiante: row.id,
            idActividadEvaluativa: evaluacion.id,
          };
        }
  
        // Si la nota no existe, crear una nueva con calificación null
        return {
          id: row.notas.id,
          calificacion: null,
          idEstudiante: row.id,
          idActividadEvaluativa: evaluacion.id,
        };
      }),
    }));
    const jsondata = JSON.stringify(updatedRows);
    await guardarNotasEstudiantes(
      idGrupo,
      jsondata,
      (response) => {
        console.log(response.data);
        toast.success("notas guardadas con éxito");
      },
      (error) => {
        toast.error("Error guardando la actividad");
        console.error(error);
      }
    );
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
                <th># Documento</th>
                <th>Nombre</th>
                {EvaluacionList.map((evaluacion) => (
                  <th key={evaluacion.id}>{evaluacion.concepto}</th>
                ))}
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
                      style={{ maxWidth: "120px" }}
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
                      style={{ maxWidth: "150px" }}
                    />
                  </td>
                  {EvaluacionList.map((evaluacion, evaluacionIndex) => {
                    const notaValue = row.notas[evaluacionIndex];
                    const isInvalid = notaValue < 0 || notaValue > 5;
                  return (
                    <td key={evaluacion.id}>
                    <input
                      type="number"
                      value={notaValue}
                      onChange={(event) => handleNotaChange(event, index, evaluacionIndex)}
                      style={{
                        maxWidth: "80px",
                        backgroundColor: isInvalid ? "red" : "inherit"
                      }}
                    />
                  </td>
                );
              })}
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
          message={`¿Desea Guardar los cambios en las notas?`}
          heading={"Guardar Notas"}
          confirmationButon={"Guardar"}
          cancelButton={"Cancelar"}
          colorButtonModal={"green"}
          colorButton={"blue"}
          buttonDisable={isGuardarDisabled}
        />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNotas;


