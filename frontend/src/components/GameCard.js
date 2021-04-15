import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'

const gameCard = (props) => {
    let buttons = null
    let imageUrl = props.game.imageUrl
    if (props.loggedIn && props.pathname !== '/') {
        buttons = (
            <React.Fragment>
                <Row>
                    <Col className="pr-0">
                        <Button block variant="danger" size="sm" onClick={() => props.deleteGameHandler(props.game)}>Delete</Button>

                    </Col>
                    <Col className="pl-0">
                        <Button block variant="primary" size="sm" onClick={() => props.editGameHandler(props.game._id)}>Edit</Button>
                    </Col>

                </Row>
                <Row className="p-0">

                    <Col>
                        <Button block variant="success" size="sm" onClick={() => props.addToCartHandler(props.game)}>Add to Cart</Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    } if (props.pathname !== '/') {
        imageUrl = props.game.coverUrl
    }

    return (
        <Col lg={props.colWidth} className="mt-3">
            <Card bg="light" key={props.game._id} className="h-100 m-0">
                <Card.Img src={imageUrl} variant="top" alt={props.game.title} />
                <Card.Body>
                    <Card.Title>
                        {props.game.title}
                    </Card.Title>
                    <Card.Text>
                        ${props.game.price}
                    </Card.Text>
                </Card.Body>
                {buttons}
            </Card>
        </Col>
    )
}

export default gameCard