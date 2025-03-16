import { useEffect, useState } from "react";

const Rawg = () => {

    const [games, setGames] = useState([]);

    const {VITE_RAWG} = import.meta.env

    useEffect(() => {
        const controller = new AbortController();
        const fetchGames = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    signal: controller.signal
                };

                const response = await fetch( VITE_RAWG, options);
                if (!response.ok) throw new Error("Error en la petición fetch");

                const data = await response.json();
                console.log(data)
                setGames(data.results)
            } catch (error) {
                if (error.name !== "AbortError") console.error(error);
            }
        }
        fetchGames();
        return () => controller.abort(); //aborta la peticion si el componente se desmonta
    }, []);
    return (
        <>
    <h1 className="Games-title">Games</h1>
        <div className="Games">
            {games.map((game, i) => (
                <Game key={i} game={game} />
            ))}

        </div>
        </>
    );
    
}

export default Rawg;



export const Game = ({ game }) => {
    const { name, background_image, released, rating, platforms } = game;
    return (<div className="Game">

        <h2 className="Game-h2">{name}</h2>
        <img className="Game-img" src={background_image} alt={`Imagen de ${name}`} />
        <p className="Game-launch">Fecha de lanzammiento: {released}</p>
        <div className="Game-rating">
            <h3 className="Game-h3" >Rating</h3>
            <p>{rating}</p>
        </div>
        <div>
            <h3 className="Game-h3">Platforms</h3>
            <ul className="Game-platforms">
                {platforms.map((platform, i) => (
                    <li className="Game-li" key={i}>
                        {platform.platform.name}
                    </li>
                ))}
            </ul>
        </div>
    </div>);
}

