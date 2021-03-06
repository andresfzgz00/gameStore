import React, { useEffect, useState } from 'react'
import { CardDeck, Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actionTypes from '../store/actions'
import axios from '../axios'
import Carousel from '../components/Carousel'
import GameCard from '../components/GameCard'

const Home = props => {
    const [carousel, setCarousel] = useState([])
    const [newReleases, setNewReleases] = useState([])

    useEffect(async () => {
        const response = await axios.get('/home')
        setCarousel(response.data.carousel)
        setNewReleases(response.data.newReleases)
    }, [])

    let newGameCards = null
    if (newReleases.length > 0) {
        newGameCards = newReleases.map(game => {
            return <GameCard game={game} colWidth="4" loggedIn={props.loggedIn} pathname={props.location.pathname} />
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

const mapStatetoProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStatetoProps)(Home)