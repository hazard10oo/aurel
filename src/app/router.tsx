import { createBrowserRouter } from "react-router";
import { CartPage } from "@/pages/CartPage";
import { RootLayout } from "@/components/layout/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:slug", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
