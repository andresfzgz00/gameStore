import React, { useState, useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actionTypes from '../store/actions'
import axios from '../axios'
import NewGameForm from '../components/NewGameForm.js'

const NewGame = props => {

    const [publishers, setPublishers] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [form, setForm] = useState({
        title: null,
        dateReleased: new Date().toISOString,
        price: 60,
        description: null,
        imageUrl: null,
        coverUrl: null,
        platform: null,
        publisher: null,
        _id: null
    })
    const [game, setGame] = useState(null)

    useEffect(async () => {
        const publishersResponse = await axios.get('/publishers')
        const toBeSetPublishers = publishersResponse.data.publishers
        setPublishers(toBeSetPublishers)

        const platformsResponse = await axios.get('/platforms')
        const toBeSetPlatforms = platformsResponse.data.platforms
        setPlatforms(toBeSetPlatforms)

        if (props.history.location.state) {
            const response = await axios.get('game/' + props.history.location.state.gameId)
            setForm(response.data.game)
            setGame(response.data.game)
        }
    }, [])

    const addGameHandler = async event => {
        event.preventDefault()
        try {
            const response = await axios.post('/game', { ...form }, {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            props.history.push('/games')
            props.showAlert(response.data, 'success')
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    const updateGameHandler = async event => {
        event.preventDefault()
        try {
            const response = await axios.put('/game', { ...form }, {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            props.history.push('/games')
            props.showAlert(response.data, 'success')
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    const onChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <Container>
            <NewGameForm platforms={platforms} publishers={publishers} onAddGame={addGameHandler} onUpdateGame={updateGameHandler} onChange={onChange} toBeUpdatedGame={game ? game : null} />
        </Container>
    )

}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame)