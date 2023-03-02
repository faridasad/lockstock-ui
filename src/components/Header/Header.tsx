import "./header.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-transparent.png";

function Header() {
  return (
    <header>
      <div className="wrapper">
        <Link to="/" className="link"><img src={Logo} className="logo"/></Link>
        <nav>
          <Link to="/create" className="link primary">+ Create</Link>
          <Link to="https://www.buymeacoffee.com/faredasad" target="_blank" className="link secondary">Support</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
