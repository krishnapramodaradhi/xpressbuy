const NavListItem = (props) => {
  return (
    <li>
      <a href={props.href} title={props.title}>
        {props.children}
      </a>
    </li>
  );
};

export default NavListItem
