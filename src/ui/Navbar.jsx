import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { signOutFunc, user } = useAuth();
  console.log(user);

  const links = (
    <>
      <li>
        <NavLink to={"/services-us"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/send-percel"}>Send Percel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    signOutFunc()
      .then((reuslt) => console.log(reuslt))
      .catch((err) => console.log(err));
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {user ? (
        <div className="navbar-end flex gap-2">
          <img
            width={"50"}
            referrerPolicy="no-policy"
            className="rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <Link onClick={handleSignOut} className="btn">
            LogOut
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to={"/login"} className="btn">
            Login
          </Link>
        </div>
      )}
      <Link to={"/rider"} className="btn btn-primary mx-2 text-white">
        Be a Rider
      </Link>
    </div>
  );
};
export default Navbar;
