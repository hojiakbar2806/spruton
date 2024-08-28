import { Route, Routes } from 'react-router-dom';
import { AddBox, LootBox, Tasks } from './pages';

export const AppRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);

const routes = [
  { path: '/', element: <LootBox /> },
  { path: '/tasks-section', element: <Tasks /> },
  { path: '/add-box', element: <AddBox /> },
];
