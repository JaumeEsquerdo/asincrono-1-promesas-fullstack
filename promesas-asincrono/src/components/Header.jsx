import {  NavLink } from "react-router";

export const Header = () => {
    return ( 
        <header className="Header">
            <h1>Elige la api a la que quieras acceder</h1>
            <NavLink className="Header-link" to={"/secciones"}>Secciones</NavLink>
        </header>
     );
}
 
