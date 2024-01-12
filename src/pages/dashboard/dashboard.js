import React, { useState, useEffect } from "react";
import apiServices from "../../services/apiServices";
import translate from "../../utils/translate";
import storage from "../../services/storage";
import { Col, Nav, Tab } from 'react-bootstrap';
import './dashboard.css';
import Init from "./components/init/init";
import Teacher from "./components/teacher/teacher";
import Secciones from "./components/secciones/secciones";
import Students from "./components/students/students";
import Matriculas from "./components/matriculas/matriculas";
import Eventos from "./components/eventos/eventos";
import ModalInfo from "../../components/modal/modal_info";
import { CreateTeacher } from "../pages";
import Bitacora from "./components/bitacora/bitacora";
import Respaldo from "./components/respaldo/respaldo";
import CorritoSVG from "../../components/image/corrito";




const Dashboard = () => {
  
  const [date, setDate] = useState({ hours: null, minutes: null, seconds: null });
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const Mdate = () => {
    return (<div className="mdate">
    {date?.hours}:{date?.minutes}:{date?.seconds}
  </div>)
  }

  const handleClose1= () => {
    setIsOpen(false);
  };

  const closeSessionAndClearStorage = () => {
    console.log('closed')
    storage.empty();
    window.location.href = '/';
  }

  useEffect(() => {

    setInterval(()  => {
      const date = new Date();
      const hours = date.getHours().toLocaleString();
      const minutes = date.getMinutes().toLocaleString();
      const seconds = date.getSeconds().toLocaleString().padStart(2, '0');
      setDate({
        hours, minutes, seconds
      })
    }, 1000)

  
    const token = storage.isToken();
    if(!token){
      window.location.href = '/';
      return;
    }
    apiServices.getUser()
    .then((result) => result.json())
    .then((x) => {
      setUser(x?.data);
    })
    .catch((error) => {
      const err = translate(error.message);
      setError({error: err ?? 'Error al obtener el usuario'});
      setIsOpen(true);
    });
  }, [])

  
  
  
  return <>
    {/* <Mdate date={date}/> */}
      <div className="tabbar-sidebar vh-100" style={{overflow: 'hidden'}}>
      <Tab.Container defaultActiveKey="first">
        <Col sm={2} className="sidebar">
          <Nav variant="pills" className="d-flex flex-column justify-content-between h-100">
            <div className="row">
              <div className="col-17 d-flex justify-content-center mb-5">
                 <CorritoSVG  fillColor={'#fdfafa'}/>
              </div>
            
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="first"><center>Inicio</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="second"><center>Profesores</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="third"><center>Alumnos</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="seven"><center>Secciones</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="four"><center>Matriculas</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="five"><center>Bitácora</center></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="six"><center>Respaldo</center></Nav.Link>
              </Nav.Item>
            
            </div>
            <div className="row">
                <hr className="hr-tab"/>
                <Nav.Link className="theme-color-secondary" onClick={closeSessionAndClearStorage}>Cerrar sesión</Nav.Link>
            </div>
          </Nav>
        </Col>
        <Col sm={9} className="tab-content" style={{overflowY: 'scroll'}}>
        
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Init user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Teacher user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <Students user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="four">
              <Matriculas user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="five">
              <Bitacora user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="six">
              <Respaldo user={user}/>
            </Tab.Pane>
            <Tab.Pane eventKey="seven">
              <Secciones user={user}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Tab.Container>
    </div>
  </>
  
}

export default Dashboard;