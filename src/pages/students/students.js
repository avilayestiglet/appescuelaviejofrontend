// import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
const Students = () => {
    // const [ students, setStudents ] = useState();
    
    return (<>
        <div className="top_container sub_pages">
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container ">
          <a className="navbar-brand">
            <img src={logo} alt=""/>
            <span>
              Unidad educativa
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          </nav>
      </div>
    </header>
    
  </div>
  <div className="container mt-0 mb-5">
    <h1 className="h3 font-bold">Lista de estudiantes</h1>

    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Salon</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Yeskarlet Avila</td>
      <td>Salon A</td>
      <td>
      <div className="row d-flex justify-content-end">
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-warning m-2">editar</button>        
            <button className="btn btn-danger m-2">eliminar</button>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Sara Nieves</td>
      <td>Salon B</td>
      <td>
      <div className="row d-flex justify-content-end">
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-warning m-2">editar</button>        
            <button className="btn btn-danger m-2">eliminar</button>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Erika Suarez</td>
      <td>Salon A</td>
      <td>
      <div className="row d-flex justify-content-end">
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-warning m-2">editar</button>        
            <button className="btn btn-danger m-2">eliminar</button>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Erika Suarez</td>
      <td>Salon B</td>
      <td>
      <div className="row d-flex justify-content-end">
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-warning m-2">editar</button>        
            <button className="btn btn-danger m-2">eliminar</button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    
    </div>
    </>
       
    );
}

export default Students;