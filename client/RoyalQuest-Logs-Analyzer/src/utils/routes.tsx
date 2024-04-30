import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../Layout/Layout';

const App = lazy(() => import('../App'));
const GetFilesPage = lazy(() => import('../components/getFilesPage'));
const ItemsTablePage = lazy(() => import('../components/itemsTablePage'));
const RegistrationPage = lazy(() => import('../components/registerPage'));

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'registration',
        element: <RegistrationPage key={document.location.href} />,
      },
      {
        path: 'processData',
        element: <GetFilesPage key={document.location.href} />,
      },
      {
        path: 'itemsTable',
        element: <ItemsTablePage key={document.location.href} />,
      },
    ],
  },
];

export default routes;
