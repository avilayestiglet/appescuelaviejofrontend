import React,{ useState } from "react";
import ButtonTheme from "../../../../components/buttons/button";
import loading from "../../../../assets/images/loading.svg";
import teacherImage from '../../../../assets/images/teacher.png';
import ArrowLeft from "../../../../components/image/arrowLeft";
import ModalError from "../../../../components/modal/modal";
import utils from "../../../../utils/utils";
import CircleExclamation from "../../../../components/image/circleExclamation";
import apiServices from "../../../../services/apiServices";
import translate from "../../../../utils/translate";
import ModalInfo from "../../../../components/modal/modal_info";
import ButtonClean from "../../../../components/buttons/buttonClean";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonSearch from "../../../../components/buttons/buttonSearch";

const CreateTeacher = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [tipo, setTipo] = useState('V');
    const [cedula, setCedula] = useState('');
    const [edad, setEdad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [cause, setCause] = useState([]);
    const [password, setPassword] = useState('');
    const [teacher, setTeacher] = useState(null);

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
        setTipo('V');
    }

    const showErrorMessage = ({ message }) => {
        setIsLoading(false);
        setError(message ?? 'Error al crear el profesor');
        setIsOpen(true);
    }

    const createTeacher = () => {
        setCause([]);
        setError(null);
        setIsLoading(true);
        if(nombreCompleto.trim().length == 0){
            showErrorMessage({message: 'El nombre completo no puede estar vacio'});
        }
        if(!utils.validarNombreYApellido(nombreCompleto)){
            showErrorMessage({message: 'Ingrese nombre y apellido válido (El nombre completo debe de empezar con las iniciales en mayusculas)'});
        }
        if(!(/^(V|E|P|J)[0-9]{4,9}/).test(tipo+cedula)){
            showErrorMessage({message: 'Ingrese una cédula válida'});
        }
        const obj = {
            nombre_completo: nombreCompleto,
            cedula: tipo+cedula,
            edad,
            direccion,
            email,
            password
        };
        apiServices.createTeacher({teacher: obj})
        .then((x) => x.json())
        .then((result) => {
            setIsLoading(false);
            if (result.status === 200) {
            if (result.data != null) {
                if (result.data.length != 0) {
                    setTeacher(result.data);
                    setIsOpenSuccessModal(true);
                }
            }
            } else {
            const err = translate(result?.error ?? 'Error al crear el profesor');
            if(result?.cause!=null){
                setCause(result?.cause ?? []);
            }
            throw new Error(`${err} ${result?.status ?? ''}`);
            }
        })
        .catch((err) => {
            showErrorMessage({message: err?.message ?? "error al consultar los registros"})
            if(err?.cause!=null){
                setCause(err?.cause);
            }
        });
    }

    return ( 
        <div>
            <ModalError isOpen={isOpen} title={<div className="d-flex flex-row aling-items-center justify-content-center">
                <CircleExclamation fillColor={'#fec913'}/> <p className="ms-4">{error}</p>
            </div>} onClose={handleCloseModal}>
            {error && 
                <div className="p-3 pt-0">
                    <p>{`${error} ${error.status ?? ""}`}</p>
                    {cause && <ul className="ul">
                        {cause.map((x) => <li className="p">{x?.field}: {x?.message}</li>)}
                    </ul>}
                </div>}
            </ModalError>
            <ModalInfo children={'Profesor creado con éxito'} isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)}/>
           
            <div className="container d-flex justify-content-center">
                <div className="w-100">
                    <div className="row d'flex align-items-center">
                        {/* <div className="col-lg-6">
                            <img src={teacherImage} className="img img-fluid w-100 h-50"/>
                        </div> */}
                        <div className="col-lg-12">
                        <div className="row">
                        <div className="col-12">
                            <h4 className="h4">CREAR NUEVO PROFESOR</h4>
                        </div>
                        </div>
                        <hr/>
                        <div className="col-12 d-flex flex-column">
                            <p className="p" style={{fontSize: '13px'}}>* El nombre completo debe empezar con las iniciales en mayusculas *</p>
                            <p className="p" style={{fontSize: '13px'}}>* La cédula debe tener un minímo de 4 digitos, máximo 9 dígitos *</p>
                            <p className="p" style={{fontSize: '13px'}}>* La contraseña debe contener un minímo de 4 digitos, almenos 1 mayúscula y un signo *</p>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-12">
                                <div className="form-group floating-label">
                                    <input maxLength={50} onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Nombre completo" type="text" name="nombre_completo" value={nombreCompleto} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3  col-md-3 col-lg-3">
                                <div className="form-group floating-label">
                                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} name="tipo" id="tipo" className="form-select form-control mb-3 w-100" aria-label="Default select example">
                                            <option defaultValue={'V'} value="V">V</option>
                                            <option value="E">E</option>
                                            <option value="P">P</option>
                                            <option value="J">J</option>
                                        </select>
                                    </div>
                                </div>
                            <div className="col-6 col-sm-9 col-md-9 col-lg-9 ps-0">
                                <div className="form-group">
                                    <input maxLength={10} pattern="[0-9]{10}" onChange={(e) => setCedula(e.target.value)} placeholder="000000000" type="text" name="cedula" value={cedula} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3  col-md-3 col-lg-6">
                                <div className="form-group floating-label">
                                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} name="tipo" id="tipo" className="form-select form-control mb-3 w-100" aria-label="Default select example">
                                            <option defaultValue={'V'} value="V">Nivel</option>
                                            <option value="E">1</option>
                                            <option value="P">2</option>
                                            <option value="J">3</option>
                                        </select>
                                    </div>
                                </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input maxLength={2} pattern="[0-9]{2}" onChange={(e) => setEdad(e.target.value)} placeholder="Edad" type="text" name="edad" value={edad} className="form-control mb-3"/>
                                </div>
                            </div>
                            <div className="col-lg-12">
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
                                <ButtonSearch child={isLoading ? <Loading isLoading={isLoading} /> : "Crear"} onClick={createTeacher}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
};

export default CreateTeacher;