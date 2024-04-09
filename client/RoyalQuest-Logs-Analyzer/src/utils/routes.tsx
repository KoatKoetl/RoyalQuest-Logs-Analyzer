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
    element: <GetFilesPage />,
  },
  {
    path: 'getFilesPage/itemsTable',
    element: <ItemsTable />,
  },
];

export default routes;
