import { Link } from "react-router-dom";
import assets from "../assets";

export const Header = () => {
  return (
    <header>
      <Link className="prev-btn" to='/'>
        <i className="pi pi-angle-left"></i>
        <span>Назад</span>
      </Link>
      <div className="company-logo">
        <span className="company-name">Spruton</span>
        <span className="company-status">бот</span>
      </div>
      <button className="ellipsis-btn">
        <img src={assets.ellipsis} alt="ellipsis" />
      </button>
    </header>
  );
};
