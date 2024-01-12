import React, { useState } from "react";
import { Table } from "react-bootstrap";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import translate from "../../../../utils/translate";
import PencilSVG from "../../../../components/image/pencil";
import TrashSVG from "../../../../components/image/trash";
import ButtonTheme from "../../../../components/buttons/button";
import ModalInfo from '../../../../components/modal/modal_info';
import HeaderDashboard from "../../../../components/header/header-dashboard";
import CreateTeacher from "./create_teacher";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonSearch from "../../../../components/buttons/buttonSearch";
import generatePDF from "../../utils/jspdf";
import PdfSVG from "../../../../components/image/pdf";

const Teacher = ({ user }) => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [show, setShow] = useState (false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  
  const onCloseModal = () => setShow(false);
  const onCloseModalMessage = () => setShowMessage(false);
  
  const ModalShow = ({ profesor }) => 
    <ModalInfo isOpen={show} title={'eliminar usuario'} onClose={onCloseModal}>
      <p className="p">{`¿Estas seguro que deseas eliminar el profesor ${profesor?.nombre_completo}?`}</p>
      <div className="row d-flex justify-content-end">
        <div className="col-lg-3">
          <button onClick={() => deleteTeacher({ id: profesor.id_profesor })} className="btn btn-danger btn_on-hover w-100">Eliminar</button>
        </div>      
        <div className="col-lg-3">
          <button onClick={onCloseModal} className="btn btn-dark btn_on-hover w-100">Cancelar</button>
        </div>  
      </div>    
    </ModalInfo>

  const ModalInfoMessage = ({ message }) => <ModalInfo isOpen={showMessage} onClose={onCloseModalMessage}>
    <p className="p">{ message }</p>
  </ModalInfo>

  const Loading = ({ isLoading }) =>
    !isLoading ? "Ingresar" : <div className="spinner-border" role="status"></div>;

  const goView = ({ path }) => (window.location.href = path);

  const getTeachers = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTeachers([]);

    let queryParams = {};
    if(teacherName.trim()!=''){
        queryParams.nombre_completo = teacherName;
    }
    
    apiServices
      .getTeachers({ queryParams })
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

  const deleteTeacher = ({ id }) => {
    setIsLoading(true);
    console.log(teachers.flatMap((t) => t.id_profesor == id ? [] : t));
    setTeachers(teachers.flatMap((t) => t.id_profesor == id ? [] : t));
    apiServices.deleteTeacher({id})
    .then((x) => x.json())
    .then((r) => {
      if(r.status === 200) {
          setIsLoading(false);
          onCloseModal();
          setMessage('Profesor eliminado con éxito');
          setShowMessage(true);
      }else{
        setIsLoading(false);
        onCloseModal();
        setMessage(r?.error ?? 'Error al eliminar el profesor');
        setShowMessage(true);
      }
    })
    .catch((err) => {
      setIsLoading(false);
        onCloseModal();
        setMessage(err.message ?? 'Error al eliminar el profesor');
        setShowMessage(true);
    })
  }

  const clean = () => {
    setTeachers('');
    setIsLoading(false);
    setTeacherName('');
    setError(null);
  }

  const TeacherNameFilter = ({ isLoading, errorMessage }) => {
    return (
      <div className="form-group">
          <input
            className={`form-control ${errorMessage != null ? "is-invalid" : ""}`}
            disabled={isLoading}
            id="name"
            name="name"
            type={"text"}
            placeholder="nombre del profesor"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
          <div className="invalid-feedback">{errorMessage != null ? errorMessage : ""}</div>
      </div>
    );
  };

  const ButtonEdit = ({ obj }) => (
    <button className="btn_on-hover btn btn-warning text-dark w-100">
      <PencilSVG fillColor={"black"} width={20} height={20}/>
    </button>
  );

  const ButtonDelete = ({ obj }) => (
    <button onClick={() => {
      setTeacher(obj);
      setShow(true);
      return;
    }} className="btn_on-hover btn btn-danger text-dark w-100">
      <TrashSVG fillColor={"black"} width={20} height={20} />
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
  const NavName = ({ name }) => (<div className="nav theme-bg-primary mb-4">
  <div className="container-fluid p-3">
    <div className="navbar-brand">
      <h5 className="text-white m-0">{name}</h5>
    </div>
  </div>
</div>);

  const TableContent = () => {
    if (isLoading) {
      return (
        <tr key={1}>
          <td colSpan="8">
            <LoadingTables />
          </td>
        </tr>
      );
    }
    if (teachers.length != 0) {
      return teachers.map((teacher, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{teacher?.cedula}</td>
          <td>{teacher?.nombre_completo}</td>
          <td>{teacher?.edad}</td>
          <td>{teacher?.email}</td>
          <td>{teacher?.direccion}</td>
          <td>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 m-1">
                <ButtonEdit key={index} obj={teacher}/>
              </div>
              <div className="col-lg-6 m-1">
                <ButtonDelete key={index} obj={teacher}/>
              </div>
            </div>
          </td>
        </tr>
      ));
    }

    return (
      <tr key={1}>
        <td colSpan="8">
          <ErrorMessage message={error ?? "NO HAY REGISTROS "} />
        </td>
      </tr>
    );
  };

  const handleCloseModalCreate = () => {
    setOpenCreateModal(false)
  }

  const handleOpenModalCreate = () => {
    setOpenCreateModal(true)
  }

  return (
    <div>
      <ModalInfo
    isOpen={openCreateModal}
    onClose={handleCloseModalCreate}
    children={
      <div>
        <CreateTeacher/>
      </div>
    }/>
      <ModalInfoMessage message={message} />
      <ModalShow profesor={teacher}/>
      <HeaderDashboard user={user}/>
      <div className="container-fluid align-items-center justify-content-center p-4">
        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-3">
            <ButtonCreate onClick={() => handleOpenModalCreate()} child={"Crear profesor"} data-target="#form_modal"/>
          </div>
          <div className="col-md-6 col-lg-3">
          <ButtonTheme 
              myclass={"btn_on-hover btn bg-green text-white w-100"} 
              child={<PdfSVG  fillColor={"#fff"}/>} 
              onClick={() => generatePDF({
                name: "profesores",
                data: teachers.map((x,i) => (
                  { index: i+1, 
                    cedula: x?.cedula,
                    nombre_completo: x?.nombre_completo,
                    edad: x?.edad,
                    email: x?.email,
                    direccion: x?.direccion, 
                  })),
                columns: [
                  {header: 'Index', dataKey: 'index'},
                  {header: 'Cedula', dataKey: 'cedula'},
                  {header: 'Nombre completo', dataKey: 'nombre_completo'},
                  {header: 'Edad', dataKey: 'edad'},
                  {header: 'Correo', dataKey: 'email'},
                  {header: 'Direccion', dataKey: 'direccion'},
                ]
              })}
            />
          </div>
        </div>
        <div className="card w-100">
          <div className="card-body">
            <form action="">
              <div className="row d-flex align-items-end">
                <div className="col-lg-6 mb-3">
                  <TeacherNameFilter isLoading={isLoading} />
                </div>
                <div className="col-lg-6">
                  <div className="row w-100 d-flex justify-content-end p-0 m-0">
                    <div className="col-lg-6 m-0 mb-3">
                      <ButtonClean onClick={clean} child={"Limpiar"}></ButtonClean>
                    </div>
                    <div className="col-lg-6 m-0 mb-3">
                      <ButtonSearch onClick={getTeachers} child={isLoading ? <Loading isLoading={isLoading} /> : "Buscar"}/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      <div className="row" style={{ display: "flex", alignItems: "flex-start" }}>
        <div className="table-responsive">
        <Table striped hover size="lg" className="theme-table bg-white" style={{ borderRadius: "10px", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Cédula</th>
              <th>Nombre </th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            <TableContent />
          </tbody>
        </Table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Teacher;