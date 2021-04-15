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
        const response = await axios.get('/games')
        if (response.data.games.length > 0) {
            const toBeSetPlatforms = []
            response.data.games.forEach(game => {
                if (!toBeSetPlatforms.includes(game.platform.name)) {
                    toBeSetPlatforms.push(game.platform.name)
                }
            })
            setPlatforms(toBeSetPlatforms)
            setGames(response.data.games)
        }
        else {
            setPlatforms([])
            setGames([])
        }
    }

    useEffect(async () => {
        await setPlatformsAndGames()
    }, [])

    const deleteGameHandler = async game => {
        try {
            const response = await axios.post('/delete-game', { gameId: game._id }, {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            await setPlatformsAndGames()
            props.showAlert(response.data, 'success')
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    const editGameHandler = id => {
        props.history.push('/addGame', { gameId: id })
    }

    const addToCart = game => {
        props.addToCart(game._id)
        props.showAlert(game.title + ' added to cart successfully', 'success')
    }

    let platformDecks = <h1>No games found</h1>
    if (platforms.length > 0) {
        platformDecks = platforms.map(platform => {
            const platformGames = []
            games.forEach(game => {
                if (game.platform.name === platform) {
                    platformGames.push(game)
                }
            })
            return < PlatformDeck games={platformGames} platform={platform} deleteGameHandler={deleteGameHandler} editGameHandler={editGameHandler} addToCartHandler={addToCart} loggedIn={props.loggedIn} pathname={props.location.pathname} />
        })
    }

    return (
        <Container>
            {platformDecks}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch({ type: actionTypes.ADDTOCART, payload: { newCartItemId: id } }),
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)