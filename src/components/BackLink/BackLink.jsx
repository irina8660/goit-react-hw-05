import { TfiArrowLeft } from "react-icons/tfi";
import { Link } from "react-router-dom";
import s from "./BackLink.module.css";

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={s.link}>
      <TfiArrowLeft size="20" />
      {children}
    </Link>
  );
};
