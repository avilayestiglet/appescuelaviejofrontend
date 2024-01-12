
import React, { useState } from "react";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import HeaderDashboard from "../../../../components/header/header-dashboard";
import ClockSVG from "../../../../components/image/clock";
import './secciones.css';




const Secciones = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Aquí puedes realizar la lógica de búsqueda según tu necesidad
  };

  return (
    <>
      <HeaderDashboard user={user} />
      <div className="container move-up">
        <div className="row">
          <div className="col-12">
            <h2 className="h2">Secciones</h2>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="card w-100">
              <div className="card-body">
                <form>
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-6">
                      <div className="form-group mb-2">
                        <div className="input-with-icon">
                          <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="nombre del alumno"
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-2">
                        <div className="input-with-icon">
                          <input
                            className="form-control"
                            id="nivel"
                            name="nivel"
                            type="text"
                            placeholder="nivel"
                            value=""
                          />
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end">
                    <div className="col-md-6 col-lg-3">
                      <button
                        type="button"
                        className="btn_on-hover btn theme-bg-secondary text-white w-100"
                      >
                        Limpiar
                      </button>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <button
                        type="button"
                        className="btn_on-hover btn theme-bg-primary text-white w-100"
                        onClick={handleSearch}
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Tablas para cada nivel y sección */}
        {Array.from({ length: 3 }, (_, nivelIndex) => {
          const nivel = nivelIndex + 1;
          return (
            <div className={`row nivel-${nivel} move-up`} key={`nivel-${nivel}`}>
              <div className="col-12">
                <h3>Nivel {nivel}</h3>
              </div>
              {["A", "B"].map((seccion, seccionIndex) => (
                <div
                  className="col-12 col-md-6 mb-4 move-up"
                  key={`nivel-${nivel}-seccion-${seccion}`}
                >
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Sección {seccion}</h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Nivel</th>
                            <th>Sección</th>
                            <th>Estudiante</th>
                            <th>Profesor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Filas de la tabla para el nivel y sección actual */}
                          <tr>
                            <td>Nivel {nivel}</td>
                            <td>Sección {seccion}</td>
                            <td>Estudiante {nivel + seccion}</td>
                            <td>Profesor {nivel + seccion}</td>
                          </tr>
                          {/* Agrega más filas según tus necesidades */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Secciones;