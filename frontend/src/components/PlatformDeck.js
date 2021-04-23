import React from 'react'
import { CardDeck } from 'react-bootstrap'

import GameCard from './GameCard'

const platformDeck = (props) => {
    const platformDeck = props.games.map(game => {
        return (
            <GameCard game={game} deleteGameHandler={props.deleteGameHandler} colWidth="2" pathname={props.pathname} />
        )
    })
    return (
        <React.Fragment>
            <h2 className="mt-3">{props.platform}</h2>
            <CardDeck className="row">
                {platformDeck}
            </CardDeck>
        </React.Fragment>
    )
}

export default platformDeck