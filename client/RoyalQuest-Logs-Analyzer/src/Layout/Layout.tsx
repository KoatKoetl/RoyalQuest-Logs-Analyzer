import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
export default Layout;
