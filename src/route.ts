import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/products/:slug",
                Component: ProductDetail,
            }
        ]
    }
])