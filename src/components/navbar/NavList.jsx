import { FaUser, FaRegHeart, FaCartShopping } from 'react-icons/fa6';
import NavListItem from './NavListItem';

const NavList = () => {
  const navListItems = [
    {
      href: '/signup',
      title: 'Signup',
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
  return (
    <ul role='list'>
      {navListItems.map((listItem) => (
        <NavListItem key={listItem.href} href={listItem.href} title={listItem.title}>
          <listItem.Icon />
        </NavListItem>
      ))}
    </ul>
  );
};

export default NavList;
