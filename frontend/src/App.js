import './App.css';
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import Alert from './components/Alert'
import Home from './pages/Home'
import Games from './pages/Games'
import NavBar from './components/Navbar'
import NewGame from './pages/NewGame'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'
import Cart from './pages/Cart'

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
        <Route path="/addGame" exact component={NewGame} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/orders" exact component={Orders} />
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
