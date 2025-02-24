import { Link } from 'react-router';

const Secciones = () => {

    const apis = [
        { name: "D&D (Dragones y mazmorras)", path: "dnd", color: "#c0392b", img: "/img/dnd.avif" },
        { name: "RAWG (Videojuegos)", path: "rawg", color: "#c5552b", img: "/img/rawg.jpg" },
        { name: "Pokemon", path: "pokemon", color: "#c1392s", img: "/img/pokemon.jpg" },
    ];


    return (
        <main className='Main'>

            <div className='Secciones'>

                {
                    apis.map((api, i) => (
                        <Link className='Seccion-a' key={i} to={`/secciones/${api.path}`} style={{ color: api.color }}>
                            <div className='Seccion'>
                                <img className='Seccion-img' src={api.img} alt={`Imagen de la web de ${api.name}`} />
                                <h2>{api.name}</h2>
                            </div>
                        </Link>

                    ))
                }
            </div>

        </main>
    );
}

export default Secciones;