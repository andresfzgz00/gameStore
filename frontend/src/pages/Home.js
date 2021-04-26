import React, { useEffect, useState } from 'react'
import { CardDeck, Container } from 'react-bootstrap'
import axios from '../axios'
import Carousel from '../components/Carousel'
import GameCard from '../components/GameCard'

const Home = props => {
    const [carousel, setCarousel] = useState([])
    const [newReleases, setNewReleases] = useState([])

    useEffect(async () => {
        const response = await axios.get('date')
        setCarousel(response.data.slice(0, 3))
        setNewReleases(response.data.slice(3, 6))
    }, [])

    let newGameCards = null
    if (newReleases.length > 0) {
        newGameCards = newReleases.map(game => {
            return <GameCard game={game} colWidth="4" pathname={props.location.pathname} />
        })
    }

    return (
        <div className="mb-5">
            <Carousel newGames={carousel} />
            <Container className="mt-3">
                <h3>New Releases</h3>
                <CardDeck className="row">
                    {newGameCards}
                </CardDeck>
            </Container>
        </div>
    )
}

export default Home