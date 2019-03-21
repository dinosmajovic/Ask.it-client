import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = (props) => {
  if (!props.isUserLoading) {
    return (
      <BSNavbar bg="light" expand="md" fixed="top">
        <BSNavbar.Brand>Ask.it</BSNavbar.Brand>
      </BSNavbar>
    );
  }
  return (
    <BSNavbar className="navbar-white" expand="md" fixed="top">
      <BSNavbar.Brand
        className="cursor-pointer"
        onClick={() => props.history.push('/')}
      >
        Ask.it
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            exact
            to="/"
            className="link-unstyled"
            activeClassName="text-info"
          >
            Home
          </NavLink>
          {props.user && (
            <NavLink
              exact
              to={`/profile/${props.user.id}/questions`}
              className="link-unstyled ml-md-2"
              activeClassName="text-info"
            >
              My Questions
            </NavLink>
          )}
        </Nav>
        {props.user ? (
          <NavDropdown alignRight title={props.user.name} id="nav-dropdown">
            <NavDropdown.Item
              onClick={() => props.history.push(`/profile/${props.user.id}`)}
            >
              My profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-primary" onClick={props.logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button
            variant="primary"
            onClick={() => props.history.push('/login')}
          >
            Login
          </Button>
        )}
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  isUserLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  user: null
};

export default withRouter(Navbar);
