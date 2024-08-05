import React from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom'

const  HomePage = () => {
  return (
    <div className='homePage'>
        {/* <Link to='/dashboard'>Dashboard</Link>
         */}
        <img src='/orbital.png' alt='' className='orbital'></img>
        <div className='left'>
            <h1>GALAXY AI</h1>
            <h2>SuperCharge Your Creativity And Productivity</h2>
            <h3> lorem
            </h3>
            <Link to="/dashboard">Get started</Link>
        </div>

        <div className='right'>
            <div className='imgContainer'>
                <div className='bgContainer'>
                    <div className='bg'></div>
                </div>
                <img src='/bot.png' alt='' className='bot'></img>
            </div>
        </div>

        <div className='terms'>
            <img src='/logo.png' alt=''/>
            <div className='links'>
                <Link to={"/"}>Terms of Service</Link>
                <Link to={"/"}>Privacy Policy</Link>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default  HomePage