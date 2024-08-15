import { Route, Routes } from "react-router-dom";
import { AddBox } from "./pages";
import { NotFound } from "./pages/notfound/notfound";
import { ViewUpdate } from "./pages/box-view/view-update";

export const AppRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);

const routes = [
  { path: "/", element: <AddBox /> },
  { path: "/:id", element: <ViewUpdate /> },
  { path: "*", element: <NotFound /> },
];
