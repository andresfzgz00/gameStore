import React from 'react'
import { Card, Row, Col, Button, Image } from 'react-bootstrap'

const cartItem = props => {
    let image = null
    let button = null
    if (props.game) {
        image = (
            <Col lg="3">
                <Image src={props.game.coverUrl} width="150" alt={props.game.title} />
            </Col>
        )
        button = (
            <Button variant="danger" onClick={() => props.deleteFromCartHandler(props.game)} className="mt-auto">Delete</Button>
        )
    }
    return (
        <Card bg="light" className="mb-3" style={props.game ? null : { cursor: 'pointer' }}>
            <Card.Body>
                <Row>
                    {image}
                    <Col className="d-flex">
                        <Card.Title className="align-self-center">{props.game ? props.game.title : props.order.createdAt}</Card.Title>
                    </Col>
                    <Col className="d-flex align-items-end flex-column">
                        <h5> ${props.game ? props.game.quantity * props.game.price : props.order.total}</h5>
                        <small>Quantity: {props.game ? props.game.quantity : props.order.games.length + ' items'}</small>
                        {button}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default cartItem