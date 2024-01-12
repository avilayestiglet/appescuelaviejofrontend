
import React, { useState } from "react";
import './home.css'
import hero from '../../assets/images/hero.png';
import Login from "../login/login";
import Registrar from '../register/register';
import logo from '../../assets/images/logo.png';



const Home = () => {
  const goView = ({ path }) => (window.location.href = path);
  const [remove, setRemove] = useState({
    login: false,
    register: true
  });

  const handleRemove = ({ name }) => {
    console.log(name);
    
    if(name == "login"){
      setRemove({login: false, register: true})
      return;
    }
    if(name == "register"){
      setRemove({login: true, register: false})
      return;
    }
    setRemove({...remove});
  }


  
  

  return (
      <div className="container-fluid vh-100 d-flex m-0 p-0 justify-content-center align-items-center">
          <div className="row m-0 h-100 w-100">
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <section className="hero_section ">
              <div className="hero_detail-box text-center w-100">
                    <div className="row d-flex align-items-end text-center">
                      <a className="a mt-3 ">
                        <img src={logo} className="img-fluid" style={{width: '45px', marginTop: '-22px'}}/>
                        <span className={'h2 text-dark'} style={{fontWeight: 'bold'}}>
                          Unidad Educativa
                        </span>
                      </a>
                    </div>
                    <h1 className="mt-4">
                      "Rafael Maria Baralt"
                    </h1>
                  </div>
                  <img src={hero}  className="img-fluid move-top-bottom"/>
              </section>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center circle-right">
                <div className="bg-transparent c-transition">
                      <Login mclass={remove?.login ? 'remove w-100' : 'w-100'} onRemove={handleRemove}/>
                      <Registrar mclass={remove?.register ? 'remove w-100' : 'w-100'} onRemove={handleRemove}/>
                      {/* <ButtonTheme onClick={() => goView({path: '/login'})}  child={"Ingresar"}  myclassName="btn_on-hover btn theme-bg-secondary w-100 mb-4 p-2"/> */}
                    {/* <div className="col-12">
                      <ButtonTheme onClick={() => goView({path: '/register'})}  child={"Registrar"}  myclassName="btn_on-hover btn btn-dark w-100 mb-4 p-2"/>
                    </div> */}
                </div>
              </div>
          </div>
      </div>
  );
}





export default Home;