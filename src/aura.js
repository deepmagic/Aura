import './style.scss'

import React from "react"
import ReactDOM from "react-dom"

import { Midi } from './midi/midi'
import { Sequencer } from './sequencer/sequencer'
// <Midi />
const Aura = () => {
    return (
        <div className='aura'>
            <Sequencer />
        </div>
    )
}

export default Aura

ReactDOM.render(<Aura />, document.getElementById("app"))
import dragscroll from 'dragscroll'
