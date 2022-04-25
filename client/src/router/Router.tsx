import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import PATHS from '@constants/paths';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Alert } from '@components/Alert';
import { Dashboard } from '@pages/Dashboard';
import { Details } from '@pages/Details';

const authComp = (path: string, Component: JSX.Element) => {
  const isAuthenticated = true;
  const element = isAuthenticated ? Component : <Navigate to="/" replace />;

  return {
    path,
    element,
  };
};

const Layout = () => (
  <main className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-1">
      <Outlet />
    </div>
    <Alert />
    <Footer />
  </main>
);

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route {...authComp(PATHS.AUDIO.HOME, <Dashboard />)} />
        <Route {...authComp(PATHS.AUDIO.DETAILS, <Details />)} />
      </Route>
    </Routes>
  );
};

export { PublicRouter };
