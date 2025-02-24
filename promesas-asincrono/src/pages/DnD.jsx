import { useEffect, useState } from "react";



const dnd = () => {

    const [spells, setSpells] = useState([]);

    useEffect(() =>{
        const controller = new AbortController();
        const fetchSpells = async ()=>{
            try{
                const options = {
                    method: 'GET',
                    headers: {"Content-Type": "application/json"},
                    siggnal: controller.signal
                };

                const response = await fetch("https://www.dnd5eapi.co/api/spells", options);
                if(!response.ok) throw new Error("Error en la petición fetch");

                const data = await response.json();
                setSpells(data.results);
            } catch(error){
                if(error.name !== "AbortError") console.error(error);
            }
        }
        fetchSpells();
        return() => controller.abort(); //aborta la peticion si el componente se desmonta
    },[]);

    return ( 
        <div className="Api-container">
            <h2>Hechizos de D&D</h2>
            <ul>
                {
                    spells.map((spell,i)=> (
                        <li key={i}>{spell.name}</li>
                    ))
                }
            </ul>
        </div>
     );
}
 
export default dnd;