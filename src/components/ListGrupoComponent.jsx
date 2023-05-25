import React, { Component } from "react";
import GrupoService from "../services/GrupoService";
import ModalActEval from "./ModalActEval";
import ModalNotas from "./ModalNotas";

class ListGrupoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grupo: [],
      idProfesor: "",
    };
  }

  handleSearch = () => {
    GrupoService.getGrupoById(this.state.idProfesor).then((res) => {
      this.setState({ grupo: res.data });
    });
  };

  handleChange = (event) => {
    this.setState({ idProfesor: event.target.value });
  };

  render() {
    const { grupo, idProfesor } = this.state;
    let idgrupo = 2;
    return (
      <div>
         <h2 className="text-center">Lista de grupos</h2>
          <div className="row text justify-content align-items-center">
            <div className="col-md-4 mb-3">
              <label htmlFor="idProfesor">ID de profesor:</label>
                <input
                  type="text"
                  className="form-control"
                  id="idProfesor"
                  value={this.state.idProfesor}
                  onChange={(e) => this.setState({ idProfesor: e.target.value })}
                />
            </div>
            <div className="col-md-1 ">
              <button className="btn btn-primary" onClick={this.handleSearch}>
                Buscar
              </button>
            </div>
          </div>
          
          <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>codigo del curso</th>
              <th>nombre del curso</th>
              <th style={{ display: "none" }}>codigo del grupo</th>
              <th>nombre del grupo</th>
              <th>pensum</th>
              <th>horario</th>
              <th>ubicacion</th>
              <th>total de estudiantes</th>
              <th>Actividades Evaluativas</th>
              <th>Ver Estudiantes</th>
            </tr>
          </thead>

          <tbody>
            {grupo.map((grup) => (
              <tr key={grup.codigoGrupo}>
                <td> {grup.curso.codigoCurso} </td>
                <td> {grup.curso.nombreCurso} </td>
                <td style={{ display: "none" }}> {grup.codigoGrupo} </td>
                <td>{grup.nombreGrupo}</td>
                <td> {grup.curso.pensum} </td>
                <td> {grup.horario}</td>
                <td> {grup.aula}</td>
                <td> {grup.totalEstudiantes}</td>
                <td>
                  <ModalActEval idGrupo={grup.codigoGrupo} />
                </td>
                <td>
                  <ModalNotas idGrupo={grup.codigoGrupo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListGrupoComponent;
