import './style.scss'

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import { Midi } from 'midi/midi'
import { AuraKeys } from 'ui/input/keys'
import { Panel } from 'ui/common/panel'
import { Popup } from 'ui/common/popup'
import { Sequencer } from 'ui/sequencer'

import { configureStore } from 'store/configure'
import { initialState } from 'store/initial-state'
const store = configureStore(initialState)


import { SongOptions } from 'ui/sequencer/song-options'

const Aura = () => {
    return (
        <Provider store={store}>
            <div className='aura'>
                <AuraKeys />
                <Panel open={false}>
                    <Midi />
                </Panel>
                <Popup
                    caret={{ pos: 'bottom' }}
                    left={350} bottom={56}>
                    <SongOptions song={{ tempo: 120 }} />
                </Popup>
                <Sequencer />
            </div>
        </Provider>
    )
}

ReactDOM.render(<Aura />, document.getElementById("app"))
import dragscroll from 'dragscroll'
