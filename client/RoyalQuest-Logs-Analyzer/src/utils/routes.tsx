import App from '../App';
import { GetFilesPage } from '../components/getFilesPage';
import { ItemsTable } from '../components/itemsTablePage';

const routes = [
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
    element: <ItemsTable key={document.location.href} />,
  },
];

export default routes;
