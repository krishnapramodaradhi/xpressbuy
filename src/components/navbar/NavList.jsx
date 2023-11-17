import {
  FaUser,
  FaRegHeart,
  FaCartShopping,
  FaEllipsisVertical,
} from 'react-icons/fa6';
import NavListItem from './NavListItem';
import { db } from '../../config/db';

const NavList = ({ user }) => {
  const navListItems = [
    {
      href: user ? '/profile' : '/login',
      title: user ? 'Profile' : 'Login',
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
    {
      tag: 'button',
      title: 'More Options',
      Icon: FaEllipsisVertical
    },
  ];

  const logoutHandler = async () => {
    await db.auth.signOut();
  };
  return (
    <ul role='list'>
      {navListItems.map((listItem) => (
        <NavListItem
          key={listItem.title}
          href={listItem.href}
          title={listItem.title}
          tag={listItem.tag}
          user={user}
          logoutHandler={logoutHandler}
        >
          <listItem.Icon />
        </NavListItem>
      ))}
    </ul>
  );
};

export default NavList;
