import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import {transition} from '@machete-platform/core-bundle/controllers/Transition';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import Nav from 'react-bootstrap/lib/Nav';
// import {LinkContainer} from 'react-router-bootstrap';

@connect(state => ({}), {transition})

export default class extends Component {
  static propTypes = {
    user: PropTypes.object,
    transition: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    // const { user } = this.props;
    const { transition } = this.props;

    return (
      <Navbar className="container" fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" onClick={async () => {
              await transition('header', 0);
              await transition('slide', 0);
            }}>
              <div className="brand">
                <img src={require('../../../../../static/assets/images/logo.png')}
                     height="80%"
                     alt="Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services."
                     title="Sentient. Secure. Quality for all."/>
              </div>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        {/* <Navbar.Collapse eventKey={0}>  */}
        {/* <Nav navbar>  */}
        {/* {user && <LinkContainer to="/chat">  */}
        {/* <NavItem eventKey={1}>Chat</NavItem>  */}
        {/* </LinkContainer>}  */}
        {/* {!user &&  */}
        {/* <LinkContainer to="/login">  */}
        {/* <NavItem eventKey={5}>Login</NavItem>  */}
        {/* </LinkContainer>}  */}
        {/* {user &&  */}
        {/* <LinkContainer to="/logout">  */}
        {/* <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>  */}
        {/* Logout  */}
        {/* </NavItem>  */}
        {/* </LinkContainer>}  */}
        {/* <LinkContainer to="/about">  */}
        {/* <NavItem eventKey={4}>About Us</NavItem>  */}
        {/* </LinkContainer>  */}
        {/* <LinkContainer to="/widgets">  */}
        {/* <NavItem eventKey={2}>Widgets</NavItem>  */}
        {/* </LinkContainer>  */}
        {/* <LinkContainer to="/survey">  */}
        {/* <NavItem eventKey={3}>Survey</NavItem>  */}
        {/* </LinkContainer>  */}
        {/* </Nav>  */}
        {/* {user &&  */}
        {/* <p className="navbar-text"><strong>{user.name ? '@' + user.name : ''}</strong></p>}  */}
        {/* </Navbar.Collapse>  */}
      </Navbar>
    );
  }
}
