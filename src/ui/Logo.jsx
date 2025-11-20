import { Link } from "react-router";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-end cursor-pointer p-2 rounded-xl">
        <img width={36} src={logo} alt="" />
        <h3 className="font-extrabold text-xl md:text-2xl -ml-1">ZapShift</h3>
      </div>
    </Link>
  );
};
export default Logo;
