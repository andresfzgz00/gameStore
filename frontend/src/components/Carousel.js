import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const carousel = (props) => {

    const carouselItems = props.newGames.map(newGame => {
        return (
            <Carousel.Item key={newGame._id}>
                <Image src={newGame.imageUrl} alt={newGame.title} className="d-block w-100" />
                <Carousel.Caption>
                    <h1>{newGame.title}</h1>
                </Carousel.Caption>
            </Carousel.Item >
        )
    })

    return (
        <Carousel>
            {carouselItems}
        </Carousel>
    )
}

export default carousel