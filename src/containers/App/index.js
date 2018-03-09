import { Route } from 'react-router-dom'
import AppNavbar from 'AppNavbar'
import 'font-awesome-webpack'
import 'bootstrap-webpack'
import React from 'react'
import './app.scss'

// routes
import Home from 'containers/Home'
import Blog from 'containers/Blog'

const App = (props) => {

  return ( 
    <div className="app">
      <AppNavbar/>
      <main>
        <Route exact path="/blog" component={Blog}/>
        <Route exact path="/" component={Home}/>
      </main>
    </div>
  )
}

export default App