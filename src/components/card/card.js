import React from "react";

const Card = ({ title, subtitle, description, Icon, location }) => 

<div className="card" style={{cursor: 'pointer'}} onClick={() => window.location.href = (location ?? window.location.pathname) }>
    <div className="card-body">
        <div className="row d-flex align-items-stretch">
            <div className="col-lg-5 text-center d-flex justify-content-center aling-items-center m-auto">
                {Icon}
            </div>
            <div className="col-lg-7">
                <h5 className="card-title  mb-2">{title ?? ''}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle ?? ''}</h6>
                <p className="card-text label">{description ?? ''}</p>
            </div>
        </div>
    </div>
</div>



export default Card;