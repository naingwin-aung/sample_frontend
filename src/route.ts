import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import Checkout from "./pages/Checkout.tsx";
import AppInitializer from "./layouts/AppInitializer.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppInitializer,
    children: [
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
            Component: ProtectedRoute,
            children: [
              {
                path: ":type/checkout",
                Component: Checkout,
              },
              {
                path: ":type/:booking_number/payment-success",
                Component: PaymentSuccess,
              },
            ]
          }
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
