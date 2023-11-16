import {
  FaUser,
  FaRegHeart,
  FaCartShopping,
  FaArrowRightFromBracket,
} from 'react-icons/fa6';
import NavListItem from './NavListItem';
import { Fragment } from 'react';
import { db } from '../../config/db';

const NavList = ({ user }) => {
  const navListItems = [
    {
      href: user ? '/profile' : '/signup',
      title: user ? 'Profile' : 'Signup',
      Icon: FaUser,
    },
    {
      href: '/wishlist',
      title: 'Wishlist',
      Icon: FaRegHeart,
    },
    {
      href: '/cart',
      title: 'Shopping Cart',
      Icon: FaCartShopping,
    },
  ];

  const logoutHandler = async () => {
    await db.auth.signOut();
  }
  return (
    <ul role='list'>
      {navListItems.map((listItem) => (
        <Fragment key={listItem.href}>
          <NavListItem href={listItem.href} title={listItem.title}>
            <listItem.Icon />
          </NavListItem>
        </Fragment>
      ))}
      {user && (
        <NavListItem title='Logout' onClick={logoutHandler}>
          <FaArrowRightFromBracket />
        </NavListItem>
      )}
    </ul>
  );
};

export default NavList;
