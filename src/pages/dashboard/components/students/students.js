import React, { useState } from "react";
import { Table } from "react-bootstrap";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import translate from "../../../../utils/translate";
import PencilSVG from "../../../../components/image/pencil";
import TrashSVG from "../../../../components/image/trash";
import ButtonTheme from "../../../../components/buttons/button";
import HeaderDashboard from "../../../../components/header/header-dashboard";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonSearch from "../../../../components/buttons/buttonSearch";
import ModalInfo from "../../../../components/modal/modal_info";
import CreateStudent from "./create_student";

const Students = ({ user }) => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentMatricula, setStudentMatricula] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCloseModalCreate = () => {
    setOpenCreateModal(false)
  }
  /**
   * @function handleCloseModalCreate 
   * Esta funcion es para abrir el modal de crear estudiante
   */
  const handleOpenModalCreate = () => {
    setOpenCreateModal(true);
  }

  const Loading = ({ isLoading }) =>
    !isLoading ? "Ingresar" : <div className="spinner-border" role="status"></div>;

  const clean = () => {
    setStudentName('');
    setStudentMatricula('');
    setIsLoading(false);
    setTeachers([]);
    setError(null);
  }
  
  const goView = ({ path }) => (window.location.href = path);

  const getStudents = () => {
    setIsLoading(true);
    setTeachers([]);
    let queryParams = {};
    if(studentName.trim()!=''){
        queryParams.nombre_completo = studentName;
    }
    if(studentMatricula.trim()!=''){
        queryParams.matricula = studentMatricula;
    }
    console.log(queryParams);
    apiServices
      .getStudents({queryParams})
      .then((x) => x.json())
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          if (result.data != null) {
            if (result.data.length != 0) {
              setTeachers(result.data);
            }
          }
        } else {
          const err = translate(result?.error);
          throw new Error(err ?? "Error al consultar los registros");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err?.message ?? "error al consultar los registros");
      });
  };

  const StudentNameFilter = ({ isLoading, errorMessage }) => {
    return (
      <div className="form-group mb-2">
        <div className="input-with-icon">
          <input
            className={`form-control ${errorMessage != null ? "is-invalid" : ""}`}
            disabled={isLoading}
            id="name"
            name="name"
            type={"text"}
            placeholder="nombre del alumno"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <div className="invalid-feedback">{errorMessage != null ? errorMessage : ""}</div>
        </div>
      </div>
    );
  };

  const StudentMatriculaFilter = ({  isLoading, errorMessage }) => {
    return (
      <div className="form-group mb-2">
        <div className="input-with-icon">
          <input
            className={`form-control ${errorMessage != null ? "is-invalid" : ""}`}
            disabled={isLoading}
            id="matricula"
            name="matricula"
            type={"text"}
            placeholder="Matricula"
            value={studentMatricula}
            onChange={(e) => setStudentMatricula(e.target.value)}
          />
          <div className="invalid-feedback">{errorMessage != null ? errorMessage : ""}</div>
        </div>
      </div>
    );
  };



  

  const ButtonEdit = ({ obj }) => (
    <button  className="btn_on-hover btn btn-warning text-dark w-100 mb-2">
      <PencilSVG fillColor={"black"} />
    </button>
  );

  const ButtonDelete = ({ obj }) => (
    <button className="btn_on-hover btn btn-danger text-dark w-100 mb-2">
      <TrashSVG fillColor={"black"} />
    </button>
  );

  const LoadingTables = () => (
    <div style={{ minHeight: "50vh" }} className="container w-100 text-center d-flex align-items-center justify-content-center">
      <div className="row text-center">
        <img src={loading} alt="" className="img img-fluid" />
      </div>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div style={{ minHeight: "50vh" }} className="container w-100 text-center d-flex align-items-center justify-content-center">
      <div className="row text-center">
        <p className="p">{message}</p>
      </div>
    </div>
  );
  const NavName = ({name}) => (<div className="nav theme-bg-primary mb-4">
    <div className="container-fluid p-3">
      <div className="navbar-brand">
      <h5 className="text-white m-0">{name}</h5>
      </div>
      </div>
    </div>);

  const TableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="4">
            <LoadingTables />
          </td>
        </tr>
      );
    }
    if (teachers.length != 0) {
      return teachers.map((teacher, index) => (
        <tr key={teacher.id_alumno}>
          <td>{index + 1}</td>
          <td>{teacher?.full_name}</td>
          <td>{teacher?.matricula}</td>
          <td className="d-flex justify-content-end">
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <ButtonEdit obj={teacher} />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <ButtonDelete obj={teacher} />
            </div>
          </td>
        </tr>
      ));
    }

    return (
      <tr>
        <td colSpan="4">
          <ErrorMessage message={error ?? "NO HAY REGISTROS "} />
        </td>
      </tr>
    );
  };



  return (
    <div>
        <ModalInfo 
          isOpen={openCreateModal}
          onClose={handleCloseModalCreate}
          children={
            <div>
              <CreateStudent />
            </div>
            }
        />
        <HeaderDashboard user={user}/>
        <div className="container-fluid align-items-center justify-content-center p-4">
        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-3">
            <ButtonCreate child={"Crear alumno"} onClick={handleOpenModalCreate} />
          </div>
        </div>
        <div className="card w-100">
            <div className="card-body">
            <form>
            <div className="row d-flex align-items-center">
                <div className="col-lg-6">
                <StudentNameFilter isLoading={isLoading} />
                </div>
                <div className="col-lg-6">
                <StudentMatriculaFilter isLoading={isLoading} />
                </div>
                
            </div>
            <div className="row d-flex justify-content-end">
                <div className="col-md-6 col-lg-3">
                    <ButtonClean child={"Limpiar"} onClick={clean}/>
                </div>
                <div className="col-md-6 col-lg-3">
                    <ButtonSearch child={isLoading ? <Loading isLoading={isLoading} /> : "Buscar"} onClick={getStudents}/>
                </div>
            </div>
            </form>
            </div>
        </div>
        <div className="row" style={{ display: "flex", alignItems: "flex-start" }}>
            <Table responsive striped hover size="lg" className="theme-table bg-white" style={{ borderRadius: "10px", marginBottom: "20px" }}>
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Matricula</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <TableContent />
            </tbody>
            </Table>
        </div>
        </div>
    </div>
  );
};

export default Students;