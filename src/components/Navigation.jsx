import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="flex items-center hover:text-gray-300">
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;