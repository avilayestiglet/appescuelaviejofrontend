import React from "react";
import hero from '../../assets/images/hero.png';

const HeroSection = () => (
    <section className="hero_section ">
      <div className="hero-container container">
        <div className="hero_detail-box">
          <h3 className="h3 text-white">
         Bienvenido a<br/>
            la mejor educación
          </h3>
          <h1>
            <br/>
         <center>"Rafael Maria Baralt"</center>
          </h1>
          <div className="hero_btn-continer">
        
          </div>
        </div>
        <div className="hero_img-container">
          <div>
          <br/>
          <br/>
          <br/>
          <br/>
            <img src={hero}  className="img-fluid"/>
          </div>
        </div>
      </div>
    </section>
);

export default HeroSection;