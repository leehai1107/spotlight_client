import React, { useState } from "react";
import { useSelector } from "react-redux";

const LeftSidebar = ({ menuItems }) => {
  const isNavOpened = useSelector((state) => state.menu.isNavOpened);
  const isMenuMinified = useSelector((state) => state.menu.isMenuMinified);
  const [openedSubMenu, setOpenedSubMenu] = useState(null);


  // Toggle Submenu
  const toggleSubMenu = (index) => {
    if (openedSubMenu === index) {
      setOpenedSubMenu(null);
    } else {
      setOpenedSubMenu(index);
    }
  };

  return (
    <nav
      className={`vertical_nav ${isNavOpened ? "vertical_nav__opened" : ""} ${
        isMenuMinified ? "vertical_nav__minify" : ""
      }`}
    >
      <div className="left_section menu_left">
        <div className="left_section">
          <ul id="js-menu">
            {menuItems.map((item, index) => (
              <li className="menu--item" key={index}>
                <a
                  href={item.link}
                  className={`menu--link ${
                    openedSubMenu === index ? "menu--subitens__opened" : ""
                  }`}
                  onClick={() => toggleSubMenu(index)}
                  title={item.title}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className={`fa-solid ${item.icon} menu--icon`}></i>
                  <span className="menu--label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default LeftSidebar;
