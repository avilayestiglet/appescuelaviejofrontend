import React,{ useState } from "react";
import ButtonTheme from "../../../../components/buttons/button";
import loading from "../../../../assets/images/loading.svg";
import studentImage from '../../../../assets/images/boy.png';
import ArrowLeft from "../../../../components/image/arrowLeft";
import ModalError from "../../../../components/modal/modal";
import utils from "../../../../utils/utils";
import CircleExclamation from "../../../../components/image/circleExclamation";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonCreate from "../../../../components/buttons/buttonCreate";

const CreateStudent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [cedula, setCedula] = useState('');
    const [edad, setEdad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');

    const Loading = ({ isLoading }) =>
    !isLoading ? "Ingresar" : <div className="spinner-border" role="status"></div>;

    const handleCloseModal = () => setIsOpen(false);

    const clean = () => {
        setIsLoading(false);
        setNombreCompleto('');
        setCedula('');
        setEdad('');
        setDireccion('');
        setEmail('');
        setPassword('');
    }

    const showErrorMessage = ({ message }) => {
        setError(message ?? 'Error al crear el profesor');
        setIsOpen(true);
    }

    const createTeacher = () => {
        if(nombreCompleto.trim().length == 0){
            showErrorMessage({message: 'El nombre completo no puede estar vacio'});
        }
        if(!utils.validarNombreYApellido(nombreCompleto)){
            showErrorMessage({message: 'Ingrese nombre y apellido válido'});
        }
    }

    return ( 
        <div>
            <ModalError isOpen={isOpen} title={<CircleExclamation fillColor={'#fec913'}/>} onClose={handleCloseModal}>
            {error && 
                <div>
                <p>{`${error} ${error.status ?? ""}`}</p>
                </div>}
            </ModalError>
            <div className="container d-flex justify-content-center mt-0">
                <div className="w-100">
                    <div className="row d-flex flex-col align-items-center p-4">
                        <div className="col-lg-12">
                        <div className="row">
                        <div className="col-12">
                            <h4 className="h4">CREAR NUEVO ESTUDIANTE</h4>
                        </div>
                        </div>
                        <hr/>
                        <div className="col-12 d-flex flex-column">
                            <p className="p" style={{fontSize: '13px'}}>* El nombre completo debe empezar con las iniciales en mayusculas *</p>
                            <p className="p" style={{fontSize: '13px'}}>* La cédula debe de empezar por el tipo luego un guion, seguido de un minímo de 4 digitos, máximo 9 dígitos *</p>
                            <p className="p" style={{fontSize: '13px'}}>* La contraseña debe contener un minímo de 4 digitos, almenos 1 mayúscula y un signo *</p>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6">
                                <div className="form-group floating-label">
                                    <input onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Nombre completo" type="text" name="nombre_completo" value={nombreCompleto} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input onChange={(e) => setCedula(e.target.value)} placeholder="V-000000000" type="text" name="cedula" value={cedula} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input onChange={(e) => setEdad(e.target.value)} placeholder="Edad" type="text" name="edad" value={edad} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" type="text" name="direccion" value={direccion} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input onChange={(e) => setEmail(e.target.value)} placeholder="Correo" type="text" name="email" value={email} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="text" name="password" value={password} className="form-control mb-3"/>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 col-xl-6">
                                <ButtonClean child={"Limpiar"} onClick={clean}/>
                            </div>
                            <div className="col-lg-6 col-xl-6">
                                <ButtonCreate child={isLoading ? <Loading isLoading={isLoading} /> : "Crear"} onClick={createTeacher}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
};

export default CreateStudent;