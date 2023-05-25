import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAceptar from "./ModalAceptar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  cargarActividades,
  guardarActividades,
} from "../services/GrupoService";

const ModalActEval = ({ idGrupo }) => {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [rows, setRows] = useState([]);
  const [porcentaje, setPorcentaje] = useState(
    rows
      .map((item) => parseFloat(item.porcentaje))
      .reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
  );

  useEffect(() => {
    const fetchComboBox = async () => {
      await cargarActividades(
        idGrupo,
        (response) => {
          setRows(response.data);
          setPorcentaje(
            rows
              .map((item) => parseFloat(item.porcentaje))
              .reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
          );
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchComboBox();
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
    setPorcentaje(
      rows
        .map((item) => parseFloat(item.porcentaje))
        .reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
    );
  };

  const saveRows = async () => {
    const codigoGrupo = idGrupo; // Valor de ejemplo, puedes cambiarlo por una variable de estado si lo necesitas
    const grupo = { codigoGrupo };
    const updatedRows = rows.map((row) => ({ ...row, grupo: grupo }));
    //const data = { notas: updatedRows };
    const jsondata = JSON.stringify(updatedRows);
    //const data = { rows };
    await guardarActividades(
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
        Agregar actividad
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ACTIVIDADES EVALUATIVAS
            <h1>grupo: {idGrupo}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button onClick={addRow}>Agregar Actividad +</button>
          <ToastContainer />
          <table>
            <thead>
              <tr>
                <th style={{ display: "none" }}>Id</th>
                <th>Concepto</th>
                <th>Porcentaje</th>
                <th></th>
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
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.concepto}
                      onChange={(event) =>
                        handleChange(event, index, "concepto")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.porcentaje}
                      onChange={(event) => {
                        handleChange(event, index, "porcentaje");
                        validarPorcentaje(row.porcentaje);
                      }}
                    />
                  </td>
                  <td>
                    <ModalAceptar
                      functionAcept={deleteRow}
                      legendButton={"Eliminar"}
                      message={`¿Desea Eliminar la actividad: ${row.concepto}?`}
                      heading={"Eliminar Actividad"}
                      confirmationButon={"Eliminar"}
                      cancelButton={"Cancelar"}
                      params={{
                        index: index,
                        tieneNotas: row.tieneNotas,
                      }}
                      colorButton={"red"}
                      colorButtonModal={"red"}
                      buttonDisable={false}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <span>
                  Total:
                  {porcentaje > 100 ? (
                    <div>
                      <br />
                      <span style={{ color: "red" }}>
                        {toast.error(`el porcentaje total no es permitido`)}
                        los porcentajes suman más de 100%
                      </span>
                    </div>
                  ) : (
                    porcentaje + "%"
                  )}
                </span>
              </tr>
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
            buttonDisable={porcentaje > 100 ? true : false}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalActEval;
