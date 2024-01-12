import React from "react";
import teacher1 from "../../assets/images/teacher-1.jpg";
import teacher2 from "../../assets/images/teacher-2.jpg";
import teacher3 from "../../assets/images/teacher-3.jpg";
import teacher4 from "../../assets/images/teacher-4.jpg";
import Header from "../../components/header/header";

const Teacher = () => (
    <>
      <Header colorTitle="text-dark"/>
    <section className="teacher_section layout_padding-bottom">
    <div className="container">
      <h2 className="main-heading ">
      Maestros
      </h2>
      <p className="text-center">
        La educación preescolar es la base del desarrollo de la inteligencia, 
        personalidad y comportamiento social de las niñas y niños.
         Cursar este nivel favorece el proceso de comunicación, 
         el razonamiento matemático, la comprensión del mundo natural y social,
          así como el pensamiento crítico.
      </p>
      <div className="teacher_container layout_padding2">
        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src={teacher1}/>
            <div className="card-body">
              <h5 className="card-title">Miguel Rodriguez</h5>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={teacher2}/>
            <div className="card-body">
              <h5 className="card-title">María Bentancur </h5>
            </div>

          </div>
          <div className="card">
            <img className="card-img-top" src={teacher3}/>
            <div className="card-body">
              <h5 className="card-title">Magi Lugo</h5>

            </div>

          </div>

          <div className="card">
            <img className="card-img-top" src={teacher4} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">jonson Farias</h5>

            </div>

          </div>
        </div>
      </div>


      <div className="d-flex justify-content-center mt-3">
      </div>
    </div>
  </section>
    
    </>
);

export default Teacher;