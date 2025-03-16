import { use, useEffect, useState } from "react";

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([])

    const {VITE_POKEMON} = import.meta.env

    useEffect(()=>{
        const controller = new AbortController()
        const options = {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            signal: controller.signal
        }

        const fetchPokemons = async () =>{
            try{
                const response = await fetch(VITE_POKEMON, options)
                if(!response.ok) throw new Error("Error al obtener la lista de Pokemon")

                    const data = await response.json()
                    const pokemonList = data.results;
                    console.log(pokemonList)

                    const detailedPokemons = await Promise.all(
                        pokemonList.map(async (pokemon)=>{
                            const res = await fetch(pokemon.url, options)
                            const details = await res.json();

                            console.log(details)
                            return{
                                id: details.id,
                                name: details.name,
                                sprite: details.sprites.front_default,
                                types: details.types.map(t => t.type.name).join(", ")
                            }
                        })
                    ) //promise.all ejecuta varias promesas en paralelo y espera a que todas terminen de hacerse antes de cargar para evitar re-renderizados
                    setPokemons(detailedPokemons);
            }   catch(error){
                if(error.name !== "AbortError"){
                    console.error(error)
                }
            } 
        }
        fetchPokemons();
        return()=> controller.abort()
    },[])
    return ( <div className="Pokemons">
        <h2 style={{color: "#d8c61c"}}>Lista de Pokemons</h2>
        <ul className="Pokemons-ul">
            {
                pokemons.map((pokemon, i)=>(
                    <li className="Pokemon" key={i}>
                        <h3 className="Pokemon-name">{pokemon.name}</h3>
                        <img src={pokemon.sprite} alt={`Imagen de ${pokemon.name}`}/>
                        <p><strong>Pokemon tipo: </strong>{pokemon.types}</p>
                    </li>

                ))
            }
        </ul>

    </div> );
}
 
export default Pokemon;