import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'

const gameCard = (props) => {
    let buttons = null
    let imageUrl = props.game.imageUrl

    if (props.pathname !== '/') {
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