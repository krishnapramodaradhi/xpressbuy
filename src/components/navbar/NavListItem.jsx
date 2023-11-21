import { Link } from 'react-router-dom';
import {
  FaUserPlus,
  FaBoxesPacking,
  FaArrowRightFromBracket,
} from 'react-icons/fa6';
import styles from './NavListItem.module.css';
import { useState } from 'react';

const NavListItem = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <li className={styles.container}>
      {!props.tag ? (
        <Link to={props.href} title={props.title} onClick={props.onClick}>
          {props.children}
        </Link>
      ) : (
        <button
          title={props.title}
          onClick={toggleMenuHandler}
        >
          {props.children}
        </button>
      )}
      {props.title === 'More Options' && (
          <ul data-open={toggleMenu.toString()} role='list' className={styles.list}>
          {!props.session && (
            <li>
              <FaUserPlus />
              <Link to='/signup'>Signup</Link>
            </li>
          )}
          <li>
            <FaBoxesPacking />
            <Link to='/orders'>My Orders</Link>
          </li>
          {props.session && (
            <li onClick={props.logoutHandler}>
              <FaArrowRightFromBracket />
              <span>Logout</span>
            </li>
          )}
        </ul>
      )}
    </li>
  );
};

export default NavListItem;
