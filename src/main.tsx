import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";


import Layout from "./layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {Tag} from "./interfaces.ts";
import axios from "axios";
import SearchPage from "./pages/SearchPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async(): Promise<[] | Tag[]> =>{
            try{
                const res = await axios.get<Tag[]>("/api/Tag")
                return res.data
            }catch(e){
                return []
            }
        },
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/Blogs",
                element: <SearchPage/>
            },
            {
              path: "*",
                element: <NotFoundPage/>
            },

        ]
    }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
