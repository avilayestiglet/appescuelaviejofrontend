import React, { useState } from "react";
import { Table } from "react-bootstrap";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import translate from "../../../../utils/translate";
import TrashSVG from "../../../../components/image/trash";
import ButtonTheme from "../../../../components/buttons/button";
import ModalInfo from '../../../../components/modal/modal_info';
import HeaderDashboard from "../../../../components/header/header-dashboard";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonSearch from "../../../../components/buttons/buttonSearch";
import PdfSVG from "../../../../components/image/pdf";
import generatePDF from "../../utils/jspdf";

const Bitacora = ({ user }) => {
  const [bitacora, setBitacora] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nroBitacora, setNroBitacora] = useState('');
  const [show, setShow] = useState (false);
  const [showMessage, setShowMessage] = useState (false)
  const [message, setMessage] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const onCloseModal = () => setShow(false);
  const onCloseModalMessage = () => setShowMessage(false);
  
  const ModalShow = ({ bitacora }) => 
    <ModalInfo isOpen={show} title={'eliminar bitacora'} onClose={onCloseModal}>
      <p className="p">{`¿Estas seguro que deseas eliminar la bitacora ${bitacora?.id_bitacora}?`}</p>
      <div className="row d-flex justify-content-end">
        <div className="col-lg-3">
          <button onClick={() => deleteTeacher({ id: bitacora.id_bitacora })} className="btn btn-danger btn_on-hover w-100">Eliminar</button>
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

  const getBitacora = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setBitacora([]);

    let queryParams = {};
    if(nroBitacora.trim()!=''){
        queryParams.bitacora = nroBitacora;
    }
    
    apiServices
      .getBitacora({ queryParams })
      .then((x) => x.json())
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          if (result.data != null) {
            if (result.data.length != 0) {
              setBitacora(result.data);
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
    setTeacher(bitacora.flatMap((t) => t.id == id ? [] : t));
    apiServices.deleteTeacher({id})
    .then((x) => x.json())
    .then((r) => {
      if(r.status === 200) {
          setIsLoading(true);
          onCloseModal();
          setMessage('Profesor eliminado con éxito');
          setShowMessage(false);
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
    setBitacora('');
    setIsLoading(false);
    setNroBitacora('');
    setError(null);
    setFrom('');
    setTo('');
  }

  const ButtonDelete = ({ obj }) => (
    <button onClick={() => {
      setTeacher(obj);
      setShow(true);
    }} className="btn_on-hover btn btn-danger text-dark w-100">
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
    if (bitacora.length != 0) {
      return bitacora.map((bitacora, index) => (
        <tr key={bitacora.id_bitacora}>
          <td>{index + 1}</td>
          <td>{bitacora?.id_bitacora}</td>
          <td>{bitacora?.id_usuario}</td>
          <td>{bitacora?.email}</td>
          <td>{bitacora?.fecha}</td>
          <td>{bitacora?.actividad}</td>
          {/* <td>
            <div className="row d-flex justify-content-center">
              
              <div className="col-lg-6 m-1">
                <ButtonDelete obj={bitacora} />
              </div>
            </div>
          </td> */}
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

  return (
    <div>
      <ModalInfoMessage message={message} />
      <ModalShow profesor={teacher}/>
      <HeaderDashboard user={user}/>
      <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="h2">Bitácora</h2>
        </div>
      </div>
    </div>
      <div className="container-fluid align-items-center justify-content-center p-4 pt-0">
        <div className="row justify-content-end mb-2">
          {/* <div className="col-md-6 col-lg-3">
            <ButtonCreate child={"Crear bitacora"}/>
          </div> */}
          <div className="col-md-6 col-lg-3">
            <ButtonTheme 
              myclass={"btn_on-hover btn bg-green text-white w-100"} 
              child={<PdfSVG  fillColor={"#fff"}/>} 
              onClick={() => generatePDF({
                name: "bitacora",
                data: bitacora.map((x,i) => (
                  { index: i+1, 
                    id_bitacora: x?.id_bitacora,
                    id_usuario: x?.id_usuario,
                    email: x?.email,
                    fecha: x?.fecha,
                    actividad: x?.actividad  
                  })),
                columns: [
                  {header: 'Index', dataKey: 'index'},
                  {header: 'ID Bitacora', dataKey: 'id_bitacora'},
                  {header: 'ID Usuario', dataKey: 'id_usuario'},
                  {header: 'Correo electrónico', dataKey: 'email'},
                  {header: 'Fecha', dataKey: 'fecha'},
                  {header: 'Actividad', dataKey: 'actividad'},
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
                  <div className="form-group">
                    <input className="form-control" type="date" name="desde" value={from} onChange={(e) => setFrom(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <input className="form-control" type="date" name="hasta" value={to} onChange={(e) => setTo(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row w-100 d-flex justify-content-end p-0 m-0">
                    <div className="col-lg-3 m-0 mb-3">
                      <ButtonClean child={"Limpiar"} onClick={clean}/>
                    </div>
                    <div className="col-lg-3 m-0 mb-3">
                      <ButtonSearch child={isLoading ? <Loading isLoading={isLoading} /> : "Buscar"} onClick={getBitacora}/>
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
              <th>#_bitacora</th>
              <th>#_usuario</th>
              <th>email</th>
              <th>fecha</th>
              <th>actividad</th>
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
  );
};

export default Bitacora;