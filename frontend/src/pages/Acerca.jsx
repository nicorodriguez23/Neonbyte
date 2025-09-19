import "../styles/Acerca.css"
import fotoCeo from "../assets/images/foto-integrador.jpg"

export default function Acerca() {
  return (
    <>
      
      <header className="header">
        <h1 className="acerca-title">Acerca de Nosotros</h1>
      </header>

      <main className="acerca-container">
        <section className="intro">
          <p>
            Bienvenido a <strong>NeonByte</strong>, el destino definitivo para los entusiastas del gaming y los
            apasionados de la tecnología.
          </p>
          <p>
            Nuestro e-commerce se especializa en ofrecer los mejores componentes y accesorios para PC gamer,
            seleccionados cuidadosamente para garantizar la más alta calidad y el mejor rendimiento.
          </p>
          <p>
            En <strong>NeonByte</strong>, nos apasiona el gaming tanto como a vos. Por eso trabajamos constantemente
            para traerte las últimas novedades y garantizar que tu equipo esté siempre a la altura de los desafíos más
            exigentes. ¡Gracias por confiar en nosotros!
          </p>
        </section>

        <section className="features">
          <div className="feature">
            <h3>Variedad de Productos</h3>
            <p>Tarjetas gráficas, procesadores, memorias RAM, placas base y más.</p>
          </div>
          <div className="feature">
            <h3>Envíos Seguros</h3>
            <p>Entregas rápidas y seguras en todo el país con seguimiento online.</p>
          </div>
          <div className="feature">
            <h3>Soporte Técnico</h3>
            <p>Soporte técnico 24/7 para ayudarte a armar tu setup ideal.</p>
          </div>
        </section>

        <section className="ceo-section">
          <img src={fotoCeo || "/placeholder.svg"} alt="Foto del CEO" />
          <h2>Nicolas Rodriguez</h2>
          <p>
            Soy Nicolas Rodriguez, fundador y CEO. Me desarrollo como Full Stacker y mi pasión por el gaming y la
            tecnología me llevaron a desarrollar NeonByte: una tienda donde encuentres todo lo que buscás para la mejor
            PC...
          </p>
        </section>
      </main>

      
    </>
  )
}
