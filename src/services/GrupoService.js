import axios from "axios";

const Grupo_API_BASE_URL = "http://localhost:8080/api";

export const cargarActividades = async (idGrupo,sucessCallback, errorCallback) => {
   const options = {
     method: "GET",
     url: `${Grupo_API_BASE_URL}/${idGrupo}/actividades_evaluativas/`,
   };
   await axios.request(options).then(sucessCallback).catch(errorCallback);
 };

 export const guardarActividades = async (idGrupo,data, successCallback, errorCallback) => {
   const options = {
     method: "POST",
     url: `${Grupo_API_BASE_URL}/${idGrupo}/actividades_evaluativas/`,
     headers: { "Content-type": "application/json" },
     data,
   };
   await axios.request(options).then(successCallback).catch(errorCallback);
 };

 export const cargarEstudiantes = async (idGrupo,sucessCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${Grupo_API_BASE_URL}/${idGrupo}/estudiantes/`,
  };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const cargarEstudianteInfo = async (idEstudiante,sucessCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${Grupo_API_BASE_URL}/estudiantes/${idEstudiante}/mis-notas/`,
  };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const cargarEstudiantesNotas = async (idGrupo,sucessCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${Grupo_API_BASE_URL}/${idGrupo}/evaluacion/estudiantes`,
  };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const guardarNotasEstudiantes = async (idGrupo,data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: `${Grupo_API_BASE_URL}/${idGrupo}/notas/save`,
    headers: { "Content-type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

class GrupoService { 
      getGrupo(){
      return axios.get(Grupo_API_BASE_URL + '/grupos');

   }

   getGrupoById(grupoId) {
      return axios.get(Grupo_API_BASE_URL + '/' + grupoId + '/grupos/');
  }
}

export default new GrupoService()