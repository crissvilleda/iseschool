import "./burger_menu.css";

export default function BurgerMenu() {
  function onClickMenu(x) {
    const menu = document.getElementById("burger-menu");
    if (menu) menu.classList.toggle("change");
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("open");
  }

  return (
    <div id="burger-menu" className="burger-container" onClick={onClickMenu}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}
