import { Link } from 'react-router-dom';

const NavListItem = (props) => {
  return (
    <li>
      <Link to={props.href} title={props.title}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavListItem
