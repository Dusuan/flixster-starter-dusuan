import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import MovieList from './components/MovieList'
import Header from './components/Header'


const App = () => {
  return (
    <div className="App">
      <Header/>

      <MovieList/>

      <Footer/>
    </div>
  )
}

export default App
