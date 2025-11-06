import "../styles/contacto.css";


export default function Contacto() {
  return (
    <>
      <header className="header">
        <div className="header-content">
          
          <h1 className="titulo-contacto">¡Contactate con nosotros!</h1>
        </div>
      </header>

      <main className="contact-container">
        <div className="form-container">
          <form className="contact-form" action="#" method="POST">
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo*</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico*</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="input-group">
              <label htmlFor="mensaje">Mensaje*</label>
              <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
            </div>

            <button type="submit">Enviar Mensaje</button>
          </form>
        </div>

        <div className="map-container">
          <h2>Ubicación</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2765947.2014233266!2d-63.1189856!3d-37.3046728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcb7595281d9%3A0x4ad309fcdcf0a144!2sProvincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1674744328329!5m2!1ses!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación"
          ></iframe>
        </div>
      </main>

      
    </>
  );
}
