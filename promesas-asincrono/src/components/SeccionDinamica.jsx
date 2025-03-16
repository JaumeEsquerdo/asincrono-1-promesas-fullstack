import { useParams } from "react-router";
import DnD from "@/pages/DnD.jsx";
import Rawg from "@/pages/Rawg.jsx";
import Pokemon from "@/pages/Pokemon.jsx";

const SeccionDinamica = () => {
    const {seccionId} = useParams(); //obtiene el id de la seccion de la url

    const componentes = {
        dnd: <DnD />,
        rawg: <Rawg />,
        pokemon: <Pokemon />
    }
    return  componentes[seccionId] || <h2>Seccion no encontrada</h2>;
}

export default SeccionDinamica;