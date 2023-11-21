import {
  FaUser,
  FaRegHeart,
  FaCartShopping,
  FaEllipsisVertical,
} from 'react-icons/fa6';
import NavListItem from './NavListItem';
import { db } from '../../config/db';
import { useNavigate } from 'react-router-dom';

const NavList = ({ session }) => {
  const navigate = useNavigate();
  const navListItems = [
    {
      href: session ? '/profile' : '/login',
      title: session ? 'Profile' : 'Login',
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/', {replace: true});
  };
  return (
    <ul role='list'>
      {navListItems.map((listItem) => (
        <NavListItem
          key={listItem.title}
          href={listItem.href}
          title={listItem.title}
          tag={listItem.tag}
          session={session}
          logoutHandler={logoutHandler}
        >
          <listItem.Icon />
        </NavListItem>
      ))}
    </ul>
  );
};

export default NavList;
