import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

const updateClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <div className={s.nav}>
      <NavLink to="/" className={updateClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={updateClass}>
        Movies
      </NavLink>
    </div>
  );
};
export default Navigation;
