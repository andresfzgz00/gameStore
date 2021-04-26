import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Alert } from 'react-bootstrap'

import axios from '../axios'
import PlatformDeck from '../components/PlatformDeck'
import * as actionTypes from '../store/actions'

const Games = props => {

    const [games, setGames] = useState([])
    const [platforms, setPlatforms] = useState([])


    const setPlatformsAndGames = async () => {
        const response = await axios.get('/')
        if (response.data.length > 0) {
            const toBeSetPlatforms = []
            response.data.forEach(game => {
                if (!toBeSetPlatforms.includes(game.platform)) {
                    toBeSetPlatforms.push(game.platform)
                }
            })
            setPlatforms(toBeSetPlatforms)
            setGames(response.data)
        }
        else {
            setPlatforms([])
            setGames([])
        }
    }

    useEffect(async () => {
        await setPlatformsAndGames()
    }, [])

    let platformDecks = <h1>No games found</h1>
    if (platforms.length > 0) {
        platformDecks = platforms.map(platform => {
            const platformGames = []
            games.forEach(game => {
                if (game.platform === platform) {
                    platformGames.push(game)
                }
            })
            return < PlatformDeck games={platformGames} platform={platform} pathname={props.location.pathname} />
        })
    }

    return (
        <Container>
            {platformDecks}
        </Container>
    )
}

export default Games