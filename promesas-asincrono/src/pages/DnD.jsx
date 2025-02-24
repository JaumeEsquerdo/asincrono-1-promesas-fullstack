import { useEffect, useState } from "react";


const dnd = () => {

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchSpells = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    signal: controller.signal
                };

                const response = await fetch("https://www.dnd5eapi.co/api/spells", options);
                if (!response.ok) throw new Error("Error en la petición fetch");

                const data = await response.json();
                const spellData = data.results.slice(0, 10) //obtengo solo 10


                //segunda llamada para los detalles de los hechizos
                const spellsDetails = await Promise.all(spellData.map(async (spell) => {
                    const spellResponse = await fetch(`https://www.dnd5eapi.co${spell.url}`, options);
                    const spellDetails = await spellResponse.json();
                    return {
                        ...spell,
                        desc: spellDetails.desc,
                        higher_level: spellDetails.higher_level && spellDetails.higher_level.length > 0
                            ? spellDetails.higher_level
                            : ["No higher level effect available"]
                    }
                }))
                setSpells(spellsDetails)
                console.log(spellsDetails);

            } catch (error) {
                if (error.name !== "AbortError") console.error(error);
            }
        }
        fetchSpells();
        return () => controller.abort(); //aborta la peticion si el componente se desmonta
    }, []);

    return (
        <div className="Api-container">
            <div className="DNDSpells-header">
                <h2>Hechizos de D&D</h2>
                <img className="DNDSpells-img" src="/img/dnd.avif" alt="Imagen de DND" />
            </div>

            <ul className="DNDSpells">
                {
                    spells.map((spell, i) => (
                        <li className="DNDSpells-li" key={i}>
                            <SpellCard
                                key={i}
                                name={spell.name}
                                desc={spell.desc[0]}
                                higher_level={spell.higher_level[0]}
                                level={spell.level}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default dnd;

export const SpellCard = ({ name, desc, higher_level, level }) => {
    return (<div className="SpellCard">
        <h3 className="SpellCard-h3">{name}</h3>
        <h4>Level: {level}</h4>
        <p className="SpellCard-p"><strong>Description:</strong> {desc}</p>
        <p className="SpellCard-p"><strong>Higher Level Effect:</strong> {higher_level}</p>
    </div>

    );
}

