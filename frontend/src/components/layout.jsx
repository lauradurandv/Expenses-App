import { Outlet } from "react-router-dom";
import Header from "./header";
const Layout = ({ isLoggedIn, handlelogout }) => {
  return (
    <>
      <Header handlelogout={handlelogout} isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};
export default Layout;
