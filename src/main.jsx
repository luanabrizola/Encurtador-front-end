import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import './index.css';
import Home from './Home';

const rotas = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={rotas} />
    </StrictMode>
);
