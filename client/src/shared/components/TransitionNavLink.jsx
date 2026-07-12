import { NavLink, useNavigate } from "react-router-dom";
import { useTransition } from "react";
import PropTypes from "prop-types";

function TransitionNavLink({ to, children, ...props }) {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  const handleClick = (e) => {
    e.preventDefault();

    startTransition(() => {
      navigate(to);
    });
  };

  return (
    <NavLink {...props} to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
}

export default TransitionNavLink;

TransitionNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
