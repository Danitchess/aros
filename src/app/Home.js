import Link from 'next/link'

export default function Home() {
  return (
    <main className='main-content'>
      <h3 className="text-home-aros">Aros</h3>
      <h3 className="text-home">une entreprise pleine d'ambitions </h3>
      <h5 className="h5-home">Nous vous donnons la possibilité de personnaliser votre montre afin qu'elle vous ressemble le mieux</h5>

      <div>
        <h4 className="h4-home-perso">Personnalisez la dès maintenant</h4>
        <Link href="/boutique">

          <button className="btn-home-perso">
            <span className="text">Personnaliser</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

        </Link>
      </div>

      <section className="model">
        <h3 className="h3-model">Modèles</h3>
        <ul className="ul-home">

          <li>
            <Link href="/montre1">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre1"
                  src="/img-modeles/modele-nautilus1.png"
                  alt=""
                  height={500}
                  width={400}
                />

              </div>
            </Link>

            <p className="model-name">Aros Nautilus One</p>
            <p className="model-desc">Automatique mécanique, 45.5mm</p>
            <p className="prix-model-home">160 €</p>
            
          </li>

          <li>
            <Link href="/montre2">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre2"
                  src="/img-modeles/modele2.png"
                  alt=""
                  height={500}
                  width={400}
                />

              </div>
            </Link>

            <p className="model-name">Aros White Glow</p>
            <p className="model-desc">Automatique mécanique, 36/39mm</p>
            <p className="prix-model-home">151 €</p>
          </li>

          <li>
            <Link href="/montre3">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre3"
                  src="/img-modeles/modele3.png"
                  alt=""
                  height={500}
                  width={400}
                />
              </div>
            </Link>
            <p className="model-name">Aros Emerald Gold</p>
            <p className="model-desc">Automatique mécanique, 36/39mm</p>
            <p className="prix-model-home">151 €</p>
          </li>

        </ul>
      </section>

    </main>
  );
}
