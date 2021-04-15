import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Container, Button } from 'react-bootstrap'

const loginForm = props => {
    return (
        <Container className="mt-5">
            <Form onSubmit={props.onLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username or email..." onChange={props.onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter password..." onChange={props.onChange} required />
                </Form.Group>
                <Button variant="success" type="submit">Log in</Button>
                <NavLink to="/signup"><Form.Text className="ml-3 text-muted d-inline">Do not have an account? Sign Up!</Form.Text></NavLink>

            </Form>
        </Container>
    )
}

export default loginForm