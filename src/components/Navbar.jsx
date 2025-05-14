import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null); // Close dropdowns when toggling mobile menu
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const menuItems = [
    {
      name: "Möbler",
      path: "/catalog/furniture",
      subItems: [
        { name: "Soffor", path: "/furniture/sofas" },
        { name: "Bord", path: "/furniture/tables" },
        { name: "Stolar", path: "/furniture/chairs" },
      ],
    },
    {
      name: "Mattor",
      path: "/catalog/rugs",
      subItems: [
        { name: "Moderna", path: "/rugs/modern" },
        { name: "Vintage", path: "/rugs/vintage" },
      ],
    },
    {
      name: "Belysning",
      path: "/catalog/lighting",
      subItems: [
        { name: "Taklampor", path: "/lighting/ceiling" },
        { name: "Bordslampor", path: "/lighting/table" },
      ],
    },
    {
      name: "Kampanjer",
      path: "/catalog/campaigns",
      subItems: [
        { name: "Höstrea", path: "/campaigns/autumn" },
        { name: "Vårfynd", path: "/campaigns/spring" },
      ],
    },
  ];

  const rightMenuItems = [
    {
      name: "För säljare",
      path: "/sellers",
      subItems: [
        { name: "Sälj dina möbler", path: "/sellers/sell" },
        { name: "Tips & Råd", path: "/sellers/tips" },
      ],
    },
    {
      name: "För företag",
      path: "/business",
      subItems: [
        { name: "Kontorsmöbler", path: "/business/office" },
        { name: "Samarbeten", path: "/business/partnerships" },
      ],
    },
  ];

  return (
    <nav className="w-full bg-white shadow-lg relative z-50">
      {/* Row 1: Logo and Icons */}
      <div className="flex justify-between items-center w-full px-4 lg:px-56 py-4">
        <div className="flex items-center gap-4">
          {/* Hamburger Icon for Mobile (Left of Logo) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-3xl text-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-105 transition-all duration-300"
          >
            Möbello
          </Link>
        </div>
        {/* Icons */}
        <div className="flex gap-4 text-2xl">
          <Link to="/cart" className="hover:text-indigo-600 transition-colors duration-200">
            🛒
          </Link>
          <Link to="/profile" className="hover:text-indigo-600 transition-colors duration-200">
            👤
          </Link>
        </div>
      </div>

      {/* Row 2: Menu Items (Desktop) */}
      <div className="hidden md:flex justify-between items-center w-full px-4 lg:px-56 py-2">
        {/* Left Menu with Dropdowns */}
        <ul className="flex">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group pr-6"
              onMouseEnter={() => toggleDropdown(item.name)}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link
                to={item.path}
                className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
              {/* Dropdown */}
              <ul
                className={`absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform ${
                  openDropdown === item.name
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Right Menu with Dropdowns */}
        <ul className="flex ">
          {rightMenuItems.map((item) => (
            <li
              key={item.name}
              className="relative group pl-4"
              onMouseEnter={() => toggleDropdown(item.name)}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link
                to={item.path}
                className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
              {/* Dropdown */}
              <ul
                className={`absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform ${
                  openDropdown === item.name
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Side Menu (Slides from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-100 to-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMobileMenu}
            className="text-3xl text-gray-800 focus:outline-none"
          >
            ✖
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="text-lg font-medium text-gray-800 hover:text-indigo-600 w-full text-left"
              >
                {item.name}
              </button>
              {/* Mobile Dropdown */}
              <ul
                className={`ml-4 mt-2 transition-all duration-300 ${
                  openDropdown === item.name ? "block" : "hidden"
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      onClick={toggleMobileMenu}
                      className="block py-1 text-gray-700 hover:text-indigo-600"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {rightMenuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="text-lg font-medium text-gray-800 hover:text-indigo-600 w-full text-left"
              >
                {item.name}
              </button>
              {/* Mobile Dropdown */}
              <ul
                className={`ml-4 mt-2 transition-all duration-300 ${
                  openDropdown === item.name ? "block" : "hidden"
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      onClick={toggleMobileMenu}
                      className="block py-1 text-gray-700 hover:text-indigo-600"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {/* Mobile Icons */}
          <li>
            <Link
              to="/cart"
              onClick={toggleMobileMenu}
              className="text-2xl hover:text-indigo-600"
            >
              🛒 Cart
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={toggleMobileMenu}
              className="text-2xl hover:text-indigo-600"
            >
              👤 Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}