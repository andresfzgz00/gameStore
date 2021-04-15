import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionTypes from '../store/actions'

const navigationBar = props => {

    const onLogout = () => {
        if (props.location.pathname !== '/') {
            props.history.push('/')
        }
        props.onLogout()
    }

    const profileSvg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>

    let loginOrOut = (
        <NavDropdown.Item>
            <NavLink to="/login" activeClassName="active" exact className="dropdown-item">{props.loggedIn ? 'Log out' : 'Log in'}</NavLink>
        </NavDropdown.Item>
    )

    if (props.loggedIn) {
        loginOrOut = (
            <React.Fragment>
                <NavLink to="/cart" activeClassName="active" exact className="dropdown-item">Cart</NavLink>
                <NavLink to="/addGame" activeClassName="active" exact className="dropdown-item">Add Game</NavLink>
                <NavLink to="/orders" activeClassName="active" exact className="dropdown-item">Orders</NavLink>
                <NavDropdown.Item onClick={onLogout}>Log Out</NavDropdown.Item>
            </React.Fragment>
        )

    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/"><Navbar.Brand>Game Store</Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mx-auto">.
                        <NavLink to="/" activeClassName="active" exact className="nav-link">Home</NavLink>
                        <NavLink to="/games" activeClassName="active" exact className="nav-link">Games</NavLink>
                    </Nav>
                    <NavDropdown title={profileSvg}>
                        {loginOrOut}
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({ type: actionTypes.LOGOUT })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navigationBar))