import './init.css';
import React, {useState} from "react";
import Loading from "../../../../assets/images/loading.svg"; 
import { Carousel, Nav } from "react-bootstrap";
import kidds from "../../../../assets/images/kidss.jpg";
import kidds2 from "../../../../assets/images/kidss_2.jpg";
import HappySVG from '../../../../components/image/happy';
import ofrecemos from '../../../../assets/images/ofrecemos.png';
import horario from '../../../../assets/images/horario.png';
import grado from '../../../../assets/images/grado.png';
import StarSVG from '../../../../components/image/star';
import ClockSVG from '../../../../components/image/clock';
import HeaderDashboard from '../../../../components/header/header-dashboard';

const Init = ({ user }) => {   
    return (
        <div>
            <HeaderDashboard user={user}/>
            <div className="container align-items-center justify-content-center mt-2"> {/* // contenedor */}
            
            <div className="row p-3"> {/* // fila */}
                <div className="col-lg-6"> {/* // columna */}
                <div className='row'>
                            <img src={ofrecemos} />                            
                        </div>  
                </div>
                <div className="col-lg-6"> {/* // columna */}
                    <div className="card-init">
                        <div className='row text-center'>
                            <HappySVG fillColor={'#5f7cc0'}/>
                        </div>
                        <h2 className='h2'>OFRECEMOS</h2>
                    <ul>
                        <li>Clase de psicomotricidad que incluye rítmica cantos y juegos.</li>
                        <li>Estimulación temprana 2 días por semana dentro de la alberca.</li>
                        <li>Formación de valores.</li>
                        <li>Inglés.</li>
                        <li>Programa de Lecto-escritura.</li>
                        <li>Programa de matemáticas.</li>
                        <li>Maestros certificados y titulados.</li>
                    </ul>     
                    </div>
                </div>
            </div>
        </div>
        <div className="container align-items-center justify-content-center mt-5"> {/* // contenedor */}
            <div className="row p-3 d-flex flex-row-reverse"> {/* // fila */}
                <div className="col-lg-6"> {/* // columna */}
                <div className='row'>
                            <img src={horario} />                            
                        </div>  
                </div>
                <div className="col-lg-6"> {/* // columna */}
                    <div className="card-init">
                        <div className='row text-center'>
                            <ClockSVG fillColor={'#5f7cc0'}/>
                        </div>
                        <h2 className='h2'>HORARIO</h2>
                    <ul>
                        <li>7:30am - 8:00am Recepción de niños. </li>
                        <li>8:00am - 1:00pm Clases (Prekinder y 1o. de Kinder.)</li>
                        <li>8:00am - 1:30pm Clases (2do. y 3ero. de Kinder).</li>
                    </ul>     
                    </div>
                </div>
            </div>
        </div>

        <div className="container align-items-center justify-content-center mt-5"> {/* // contenedor */}
            <div className="row p-3 d-flex"> {/* // fila */}
                <div className="col-lg-6"> {/* // columna */}
                <div className='row'>
                            <img src={grado} />                            
                        </div>  
                </div>
                <div className="col-lg-6"> {/* // columna */}
                    <div className="card-init">
                        <div className='row text-center'>
                            <StarSVG fillColor={'#5f7cc0'}/>
                        </div>
                        <h2  className='h2 mt-3'>GRADOS QUE SE IMPARTEN</h2>
                    <ul>
                        <li>Prekinder de 2 a 3 años. </li>
                        <li>1ero. 3 años de edad.</li>
                        <li>2do. 4 años de edad.</li>
                        <li>3ero. 5 años de edad.</li>
                    </ul>     
                    </div>
                </div>
            </div>
        </div>
        
        </div>);
}

export default Init;