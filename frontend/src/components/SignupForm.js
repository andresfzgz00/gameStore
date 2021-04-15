import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Col, Row, Container, Button } from 'react-bootstrap'

const signupForm = props => {
    return (
        <Container className="mt-5">
            <Form onSubmit={props.onSignup}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter your name..." onChange={props.onChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Enter your last name" onChange={props.onChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username..." onChange={props.onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email..." onChange={props.onChange} required />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter password..." onChange={props.onChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name="confirmPassword" type="password" placeholder="Confirm your password..." onChange={props.onChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control as="select" name="type" onChange={props.onChange} required>
                        <option value="default">Select account type...</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">Sign Up</Button>
                <NavLink to="/login"><Form.Text className="ml-3 text-muted d-inline">Already have an account? Log in!</Form.Text></NavLink>

            </Form>
        </Container>
    )
}

export default signupForm