import React, { useState } from "react";
import apiServices from "../../../../services/apiServices";
import loading from "../../../../assets/images/loading.svg";
import HeaderDashboard from "../../../../components/header/header-dashboard";
import ClockSVG from "../../../../components/image/clock";

const Respaldo = ({ user }) => {
  return (
  <>
    <HeaderDashboard user={user}/>
    <div className="container mb-3">
      <div className="row">
        <div className="col-12">
          <h2 className="h2">Respaldo</h2>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 flex items-center justify-center">
              <div className="card-init-2 text-center" 
                style={{
                  minHeight: '20rem', 
                  textAlign: 'center', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  cursor: 'pointer'
                  }}>
                        <div className='row text-center'>
                            {/* <ClockSVG fillColor={'#5f7cc0'}/> */}
                        </div>
                        <h2 className='h2 text-center'>Respaldo</h2>     
              </div>
        </div>
        <div className="col-lg-6 flex items-center justify-center">
              <div className="card-init-2 text-center" 
                style={{
                  minHeight: '20rem', 
                  textAlign: 'center', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  cursor: 'pointer'
                  }}>
                        <div className='row text-center'>
                            {/* <ClockSVG fillColor={'#5f7cc0'}/> */}
                        </div>
                        <h2 className='h2 text-center'>Restauración</h2>     
              </div>
        </div>
      </div>      
    </div>
  </>
  );
};

export default Respaldo;