import "./navbar.css";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="d-flex justify-content-end w-100">
          <BurgerMenu />
        </div>
      </nav>
    </>
  );
}
