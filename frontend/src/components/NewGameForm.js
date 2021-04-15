import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const newGameForm = (props) => {
    const platforms = props.platforms.map(platform => {
        let selected = false
        if (props.toBeUpdatedGame) {
            selected = props.toBeUpdatedGame.platform === platform._id.toString()
        }
        return <option key={platform._id} value={platform._id.toString()} selected={selected}>{platform.name}</option>
    })
    const publishers = props.publishers.map(publisher => {
        let selected = false
        if (props.toBeUpdatedGame) {
            selected = props.toBeUpdatedGame.publisher === publisher._id.toString()
        }
        return <option key={publisher._id} value={publisher._id.toString()} selected={selected}>{publisher.name}</option>
    })
    return (
        <React.Fragment>
            <Form onSubmit={props.toBeUpdatedGame ? props.onUpdateGame : props.onAddGame}>
                <Form.Group className="mt-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter game title" name="title" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.title : null} required />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Date Released</Form.Label>
                            <Form.Control type="date" name="dateReleased" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.dateReleased : null} />
                        </Col>
                        <Col>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="USD" defaultValue="60" name="price" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.price : null} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" name="description" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.description : null} />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Image url" name="imageUrl" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.imageUrl : null} required />
                        </Col>
                        <Col>
                            <Form.Label>Cover Url</Form.Label>
                            <Form.Control type="text" placeholder="Cover url" name="coverUrl" onChange={props.onChange} defaultValue={props.toBeUpdatedGame ? props.toBeUpdatedGame.coverUrl : null} required />
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Platform</Form.Label>
                        <Form.Group>
                            <Form.Control as="select" name="platform" onChange={props.onChange} defaultValue="Select Platform..." required>
                                <option value="Select Platform...">Select Platform...</option>
                                {platforms}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Publisher</Form.Label>
                        <Form.Group>
                            <Form.Control as="select" name="publisher" onChange={props.onChange} defaultValue="Select Publisher..." required>
                                <option value="Select Publisher...">Select Publisher...</option>
                                {publishers}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant={props.toBeUpdatedGame ? 'primary' : 'success'} className="ml-auto" type="submit">{props.toBeUpdatedGame ? 'Update' : 'Add'}</Button>
            </Form>
        </React.Fragment>
    )
}

export default newGameForm