import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'

const navigationBar = () => {

    const profileSvg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>

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
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default withRouter(navigationBar)