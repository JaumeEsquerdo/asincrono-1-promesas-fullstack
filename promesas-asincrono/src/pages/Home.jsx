import { Link } from "react-router";

const Home = () => {
    return ( 
        <header className="Header-home">
            <h1>APIs con promesas</h1>
            <Link to="/secciones">Entra por aquí!</Link>
        </header>
     );
}
 
export default Home;