import React, { useState } from "react";
import './eventos.css';
import evento1 from '../../../../assets/images/evento-1.jpg';
import evento2 from '../../../../assets/images/evento-2.jpg';
import evento3 from '../../../../assets/images/evento-3.jpg';
import evento4 from '../../../../assets/images/evento-4.jpg';
import evento5 from '../../../../assets/images/evento-5.jpg';
import evento6 from '../../../../assets/images/evento-6.jpg';
import evento7 from '../../../../assets/images/evento-7.jpg';
import evento8 from '../../../../assets/images/evento-8.jpg';
import HeaderDashboard from "../../../../components/header/header-dashboard";


const Eventos = ({ user }) => {
  

  return (
    <div>
		<HeaderDashboard user={user}/>
        <div className="contenedor ">
		<div className="evento">
			<div className="imagen">
			<img src={evento1} alt="Evento 1" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Día del Padre</h2>
				<p className="fecha">19 de junio de 2023</p>
				<p className="descripcion">Celebra el Día del Padre con nosotros en nuestro jardín de niños. Tendremos actividades divertidas para los niños y sus papás, como juegos, manualidades y un picnic.</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento2} alt="Evento 2" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Fiesta de Halloween</h2>
				<p className="fecha">31 de octubre de 2023</p>
				<p className="descripcion">Ven a nuestra fiesta de Halloween en el jardín de niños. Tendremos disfraces, dulces, juegos y más te divertiras con tus amiguitos .  ¡No te lo pierdas!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento3} alt="Evento 3" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Concurso de dibujo</h2>
				<p className="fecha">15 de diciembre de 2023</p>
				<p className="descripcion">Participa en nuestro concurso de dibujo y gana grandes premios.Está abierto a todos los niños de preescolar. ¡Demuestra tu creatividad y habilidadess!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento4} alt="Evento 4" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Carrera de obstáculos</h2>
				<p className="fecha">5 de marzo de 2024</p>
				<p className="descripcion">Ven a nuestra carrera de obstáculos en el jardín de niños. Tendremos obstáculos divertidos para que los niños pongan a prueba sus habilidades físicas. ¡No te lo pierdas!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento5} alt="Evento 5" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Visita al zoológico</h2>
				<p className="fecha">22 de mayo de 2024</p>
				<p className="descripcion">Ven con nosotros al zoológico y aprende sobre los animales. Tendremos guías expertos que nos enseñarán sobre los hábitats y comportamientos de los animales. ¡Será divertido!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento6} alt="Evento 6" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Festival de música</h2>
				<p className="fecha">10 de agosto de 2024</p>
				<p className="descripcion">Ven y disfruta del festival de música en nuestro jardín de niños. Tendremos música en vivo, comida, bebida y mucho más ven a divertite. ¡No te lo pierdas!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento7} alt="Evento 7" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Día de la Tierra</h2>
				<p className="fecha">22 de abril de 2025</p>
				<p className="descripcion">Celebra el Día de la Tierra con nosotros en nuestro jardín de niños. Tendremos actividades divertidas , como plantar árboles,y aprender sobre la importancia de cuidar el planeta.</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>

		<div className="evento">
			<div className="imagen">
				<img src={evento8} alt="Evento 8" width="400" height="300"/>
			</div>
			<div className="informacion">
				<h2 className="titulo">Fiesta de fin de curso</h2>
				<p className="fecha">30 de junio de 2025</p>
				<p className="descripcion">Celebra el fin de curso con nosotros en nuestra fiesta de jardín de niños al lado de tus amiguitos y amiguitas. Tendremos comida, bebida, música y más. ¡No te lo pierdas!</p>
				<a href="#" className="boton">Más información</a>
			</div>
		</div>
	</div>
    </div>
  );
};

export default Eventos;