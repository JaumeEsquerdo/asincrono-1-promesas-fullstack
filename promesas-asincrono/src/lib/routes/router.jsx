import { createBrowserRouter } from "react-router";

//importe de páginas
import Home from '../../pages/Home';
import Secciones from '@/pages/Secciones'


// importar páginas especiales
import Layout from '@/Layout';
import ErrorPage from "@/pages/ErrorPage";
import SeccionDinamica from "@/components/SeccionDinamica";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        index: true, // página principal sin Layout, para q no comparta header y footer
    }
    ,
    
    {
    element: <Layout/>,
    children: [
        // {
        //     index: true,
        //     element:<Home/>
        // },
        {
            path: '/secciones',
            element: <Secciones/>
        },
        {
            path: '/secciones/:seccionId',
            element: <SeccionDinamica/>
        }
        ,
        {
            path: '*',
            element: <ErrorPage/>
        }
        
    ]

}])

export default router;