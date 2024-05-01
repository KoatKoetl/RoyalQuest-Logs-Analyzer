import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../Layout/Layout';

const App = lazy(() => import('../App'));
const HomePage = lazy(() => import('../components/HomePage'));
const GetFilesPage = lazy(() => import('../components/getFilesPage'));
const ItemsTablePage = lazy(() => import('../components/itemsTablePage'));
const RegistrationPage = lazy(() => import('../components/registerPage'));
const SendFilesPage = lazy(() => import('../components/sendFilesPage'));

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      // Change homepage to have the app overview and after navigate to the sendfile page
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'sendFiles',
        element: <SendFilesPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage key={document.location.href} />,
      },
      {
        path: 'sendFiles/processData',
        element: <GetFilesPage key={document.location.href} />,
        children: [],
      },
      {
        path: 'sendFiles/processData/itemsTable',
        element: <ItemsTablePage key={document.location.href} />,
      },
    ],
  },
];

export default routes;
