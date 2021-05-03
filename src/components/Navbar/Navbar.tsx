import "./styles/navbar.css";
import { NavLink } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";

import { useUser } from "../../store/userStore";
import { EditInfoButton } from "./EditInfoButton/EditInfoButton";

export const Navbar = () => {
  const { user, signout } = useUser();

  return (
    <nav className="navbar">
      <ul className="navbar__linkWrapper">
        {user ? (
          <>
            <div className="navbar__loggedinLeft">
              <NavLink
                exact
                to="/"
                className="navbar__link"
                activeClassName="navbar__activeLink"
              >
                <li className="navbar__item">
                  <span className="navbar__linkText">Portfolio</span>
                </li>
              </NavLink>
              <NavLink
                exact
                to="/episodes"
                className="navbar__link"
                activeClassName="navbar__activeLink"
              >
                <li className="navbar__item">
                  <span className="navbar__linkText">Episodes</span>
                </li>
              </NavLink>
              <NavLink
                exact
                to="/contact"
                className="navbar__link"
                activeClassName="navbar__activeLink"
              >
                <li className="navbar__item">
                  <span className="navbar__linkText">Contact</span>
                </li>
              </NavLink>
            </div>
            <EditInfoButton />

            <button
              className="navbar__adminExit"
              onClick={() => {
                signout();
              }}
            >
              <FaDoorOpen color="white" size="30" />
            </button>
          </>
        ) : (
          <div className="navbar__left">
            <NavLink
              exact
              to="/"
              className="navbar__link"
              activeClassName="navbar__activeLink"
            >
              <li className="navbar__item">
                <span className="navbar__linkText">Portfolio</span>
              </li>
            </NavLink>
            <NavLink
              exact
              to="/episodes"
              className="navbar__link"
              activeClassName="navbar__activeLink"
            >
              <li className="navbar__item">
                <span className="navbar__linkText">Episodes</span>
              </li>
            </NavLink>
            <NavLink
              exact
              to="/contact"
              className="navbar__link"
              activeClassName="navbar__activeLink"
            >
              <li className="navbar__item">
                <span className="navbar__linkText">Contact</span>
              </li>
            </NavLink>
          </div>
        )}
      </ul>
    </nav>
  );
};
