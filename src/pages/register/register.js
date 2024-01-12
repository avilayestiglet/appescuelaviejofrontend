import React, { useState } from "react";
import apiServices from "../../services/apiServices";
import ModalError from '../../components/modal/modal';

const Register = ({ mclass, onRemove }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Loading = ({ isLoading }) => !isLoading ? "Registrar" : <div className="spinner-border" role="status"></div>

  const handleLoading = ({loading}) => {
    setIsLoading(loading ?? !isLoading);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const registerService = (e) => {
    e.preventDefault();
    handleLoading({loading: true});

    if(!email && !password) {
      setError({error: 'Usuario o contraseña incorrecta'});
      setIsOpen(true);
      handleLoading({loading: false});
      return;
    }
    

    apiServices.register({email, password}).
    then((res) => res.json())
    .then((result) => {
      if(result.status === 200){
        const message = result.message;
        if(message!=null){
          handleLoading({loading: false});
          onRemove({name: 'login'})
        }
      }else{
        setError(result);
        handleLoading({loading: false});
        setIsOpen(true);
      }
    })
    .catch((err) => {
        setIsOpen(true)
        handleLoading({loading: false});
        console.log(err);
    });
    
  };

  


    return (<div className={`contact_section layout_padding-bottom d-flex flex-row justify-content-center ${mclass}`}>
    <ModalError isOpen={isOpen} title={"Error al iniciar sesión"} onClose={handleCloseModal}>
      {error && 
        <div>
          <p>{`${error.error ?? "error al realizar la consulta "} ${error.status ?? ""}`}</p>
        </div>}
    </ModalError>
    <div className="container mt-5 d-flex flex-column justify-content-center">
        <div className="row d-flex flex-row justify-content-center">
            <div className="col-lg-12">
                <div className="card p-4">
      
                    <h2 className="main-heading">
                      <br/>
                      U.E"Rafael Maria Baralt"
                    </h2>
                    <p className="text-center">
                    </p>
                    <div className="">
                      <div className="contact_section-container">
                        <div className="row">
                          <div className="col-md-12 mx-auto">
                            <div className="contact-form">
                              <form id="registerForm" name="registerForm" onSubmit={registerService}>
                                {/* <div className="form-group">
                                  <label >Matricula</label>
                                  <input className="form-control" id="matricula" name="matricula"  type="text" placeholder="Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)}/>
                                </div> */}
                                {/* <div className="form-group">
                                  <label>Nombre completo</label>
                                  <input className="form-control" id="full_name" name="full_name"  type="text" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                </div> */}
                                <div className="form-group">
                                  <label >Ingrese correo electronico</label>
                                  <input className="form-control" id="email" name="email"  type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                
                                <div className="form-group">
                                  <label >Ingrese su clave</label>
                                  <input className="form-control" id="password" name="password" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <button id="buttonLogin" type="submit" className="btn_on-hover btn theme-bg-secondary">
                                    <Loading isLoading={isLoading}/>
                                  </button>
                                </div>
                                <div className="row mt-3 text-center" >
                                  <p className="p m-0">
                                    ¿Ya posee una cuenta? <a className="a text-center m-0 " style={{cursor: 'pointer'}} onClick={() => onRemove({name: 'login'})}>
                                    Iniciar sesión
                                    </a>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              
                  </div>
            </div>
        </div>
    </div>
  </div>);
};

export default Register;