import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const App = lazy(() => import('../App'));
const GetFilesPage = lazy(() => import('../components/getFilesPage'));
const ItemsTablePage = lazy(() => import('../components/itemsTablePage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'getFilesPage',
    element: <GetFilesPage key={document.location.href} />,
  },
  {
    path: 'getFilesPage/itemsTable',
    element: <ItemsTablePage key={document.location.href} />,
  },
];

export default routes;
