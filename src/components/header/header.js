import React from "react";
import logo from '../../assets/images/logo.png';



const Header = ({ isDashboard, colorTitle="text-white" }) => (
    <header className="header_section">
      <div className="container d-flex justify-content-between w-100">
        <nav className="navbar navbar-expand-lg custom_nav-container w-100">
          <a className="navbar-brand" href={`/`}>
            <img src={logo}/>
            <span className={colorTitle}>
              Unidad Educativa
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {!isDashboard && <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <div className="w-100 d-flex flex-column flex-lg-row align-items-end justify-content-end">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <a className="nav-link" href={`/`}> Inicio <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href={`/about`}> Quienes Somos </a>
                </li>

                <li className="nav-item ">
                  <a className="nav-link" href={`/teacher`}> Maestros</a>
                </li>


                <li className="nav-item">
                  <a className="nav-link" href={`/contact`}> Contáctanos </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href={`/login`}> Iniciar seción </a>
                </li>

              </ul>
            </div>
          </div>}
        </nav>
      </div>
    </header>
);

export default Header;