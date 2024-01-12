import React, { useState } from "react";
import ButtonCreate from "../../../../components/buttons/buttonCreate";
import ButtonClean from "../../../../components/buttons/buttonClean";
import CircleExclamation from "../../../../components/image/circleExclamation";
import ModalError from "../../../../components/modal/modal";


const CreateMatricula = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ matricula, setMatricula ] =  useState();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
        
    const handleCloseModal = () => setIsOpen(false);


    const Loading = ({ isLoading }) =>
    !isLoading ? "Crear" : <div className="spinner-border" role="status"></div>;

    const clean = () =>{
        setIsLoading(false);
        setMatricula('');
    }

    const showErrorMessage = ({ message }) => {
        setError(message ?? 'Error al crear la matricula');
        setIsOpen(true);
    }

    const createMatricula = () => {
        if(matricula.trim().length == 0){
            showErrorMessage({message: 'La matricula no puede estar vacia'});
        }
    }

    return <div>
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
                            <h4 className="h4">CREAR NUEVA MATRICULA</h4>
                        </div>
                        </div>
                        <hr/>
                        <div className="row mt-3">
                            <div className="col-lg-6">
                                <div className="form-group floating-label">
                                    <input onChange={(e) => setIsOpen(e.target.value)} placeholder="Matricula" type="text" name="matricula" value={matricula} className="form-control mb-3"/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 col-xl-6">
                                <ButtonClean child={"Limpiar"} onClick={clean}/>
                            </div>
                            <div className="col-lg-6 col-xl-6">
                                <ButtonCreate child={isLoading ? <Loading isLoading={isLoading} /> : "Crear"} onClick={createMatricula}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        
}

export default CreateMatricula;