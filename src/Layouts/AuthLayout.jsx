import { Outlet } from "react-router";
import Logo from "../ui/Logo";
import img from "../assets/authImage.png";
import Container from "../ui/Container";

const AuthLayout = () => {
  return (
    <div>
      <Container>
        <Logo />
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="flex-1">
            <img src={img} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default AuthLayout;
