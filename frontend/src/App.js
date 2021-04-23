import './App.css';
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import Alert from './components/Alert'
import Home from './pages/Home'
import Games from './pages/Games'
import NavBar from './components/Navbar'

const App = props => {
  let alert = null
  if (props.alert.show) {
    alert = (
      <Alert text={props.alert.text} variant={props.alert.variant} />
    )
  }
  return (
    <React.Fragment>
      <NavBar />
      {alert}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" exact component={Games} />
      </Switch>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps)(App)
