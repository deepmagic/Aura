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

const Aura = () => {
    return (
        <Provider store={store}>
            <div className='aura'>
                <AuraKeys />
                <Panel>
                    <Midi />
                </Panel>
                <Popup
                    caret={{ pos: 'top', x:'285px' }}
                    x={1920-350}
                    y={45}>
                    <div style={{ width: 300, height: 200 }}>Hello</div>
                </Popup>
                <Sequencer />
            </div>
        </Provider>
    )
}

ReactDOM.render(<Aura />, document.getElementById("app"))
import dragscroll from 'dragscroll'
