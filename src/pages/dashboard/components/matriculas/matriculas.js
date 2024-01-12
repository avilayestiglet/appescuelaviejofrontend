import React, { useState } from "react";
import { Table } from "react-bootstrap";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import translate from "../../../../utils/translate";
import TrashSVG from "../../../../components/image/trash";
import ModalInfo from '../../../../components/modal/modal_info';
import HeaderDashboard from "../../../../components/header/header-dashboard";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonSearch from "../../../../components/buttons/buttonSearch";
import CreateMatricula from "./create_matricula";

const Matriculas = ({ user }) => {
  const [matriculas, setMatriculas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nroMatricula, setNroMatricula] = useState('');
  const [show, setShow] = useState (false);
  const [openCreateModal, setOpenCreateModal] = useState (false);
  const [showMessage, setShowMessage] = useState (false)
  const [message, setMessage] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const onCloseModal = () => setShow(false);
  const onCloseModalMessage = () => setShowMessage(false);
  
  const ModalShow = ({ matricula }) => 
    <ModalInfo isOpen={show} title={'eliminar matricula'} onClose={onCloseModal}>
      <p className="p">{`¿Estas seguro que deseas eliminar la matricula ${matricula?.matricula}?`}</p>
      <div className="row d-flex justify-content-end">
        <div className="col-lg-3">
          <button onClick={() => deleteTeacher({ id: matricula?.id_matricula })} className="btn btn-danger btn_on-hover w-100">Eliminar</button>
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

  const getMatriculas = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMatriculas([]);

    let queryParams = {};
    if(nroMatricula.trim()!=''){
        queryParams.matricula = nroMatricula;
    }
    
    apiServices
      .getMatriculas({ queryParams })
      .then((x) => x.json())
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          if (result.data != null) {
            if (result.data.length != 0) {
              setMatriculas(result.data);
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
    // setTeacher(matriculas.flatMap((t) => t.id == id ? [] : t));
    // apiServices.deleteTeacher({id})
    // .then((x) => x.json())
    // .then((r) => {
    //   if(r.status === 200) {
    //       setIsLoading(true);
    //       onCloseModal();
    //       setMessage('Profesor eliminado con éxito');
    //       setShowMessage(false);
    //   }else{
    //     setIsLoading(false);
    //     onCloseModal();
    //     setMessage(r?.error ?? 'Error al eliminar el profesor');
    //     setShowMessage(true);
    //   }
    // })
    // .catch((err) => {
    //   setIsLoading(false);
    //     onCloseModal();
    //     setMessage(err.message ?? 'Error al eliminar el profesor');
    //     setShowMessage(true);
    // })
  }

  const clean = () => {
    setMatriculas('');
    setIsLoading(false);
    setNroMatricula('');
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
            placeholder="Nro. matricula"
            value={nroMatricula}
            onChange={(e) => setNroMatricula(e.target.value)}
          />
          <div className="invalid-feedback">{errorMessage != null ? errorMessage : ""}</div>
      </div>
    );
  };



  const ButtonDelete = ({ obj }) => (
    <button onClick={() => {
      setTeacher(obj);
      setShow(true);
    }} className="btn_on-hover btn btn-danger text-dark">
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
        <tr>
          <td colSpan="8">
            <LoadingTables />
          </td>
        </tr>
      );
    }
    if (matriculas.length != 0) {
      return matriculas.map((matricula, index) => (
        <tr key={matricula.id_matricula}>
          <td>{index + 1}</td>
          <td>{matricula?.matricula}</td>
          <td>
            <div className="row d-flex justify-content-end">
              
              <div className="col-lg-3">
                <ButtonDelete obj={matricula} />
              </div>
            </div>
          </td>
        </tr>
      ));
    }

    return (
      <tr>
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
            <CreateMatricula />
          </div>
        }
      />
      <ModalInfoMessage message={message} />
      <ModalShow profesor={teacher}/>
      <HeaderDashboard user={user}/>
      <div className="container-fluid align-items-center justify-content-center p-4">
        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-3">
            <ButtonCreate child={"Crear matricula"} onClick={handleOpenModalCreate}/>
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
                      <ButtonClean child={"Limpiar"} onClick={clean}/>
                    </div>
                    <div className="col-lg-6 m-0 mb-3">
                      <ButtonSearch child={isLoading ? <Loading isLoading={isLoading} /> : "Buscar"} onClick={getMatriculas}/>
                    </div>
                  </div>
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
              <th>Nro. matricula</th>
              <th colspan="2" className="row flex justify-content-end ms-5"><div className="col-12 text-end me-5">Acción</div></th>
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

export default Matriculas;