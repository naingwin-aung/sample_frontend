import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import Checkout from "./pages/Checkout.tsx";

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
      },
      {
        path: ":type/checkout",
        Component: Checkout
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
