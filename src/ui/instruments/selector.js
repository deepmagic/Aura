import React from 'react'
import { getLoopId } from 'ui/sequencer/utils'
import { defaultLoop, defaultTrack } from 'ui/sequencer/constants'


const availableInstruments = [
    {id: 1, name: 'Linndrum', image: 'images/instruments/linndrum.png'},
    {id: 2, name: 'Poly Synth', image: 'images/instruments/polysix.png'},
    {id: 3, name: 'Roland 808', image: 'images/instruments/808.png'},
    {id: 4, name: 'FM Synth', image: 'images/instruments/dx7.png'},
    {id: 5, name: 'AM Synth', image: 'images/instruments/jupiter.png'},

    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
]

const InstView = ({name, image, ...props}) =>
    <div className='instrument' {...props} style={{ backgroundImage: `url(${image})` }}>
        {name}
    </div>

export class InstrumentSelectorView extends React.Component {
    addInstrument = (instrument = {}) => {
        const {
            scenes,
            tracks,
            // actions
            trackAdd,
            loopSetAdd,
            instrumentAdd,
            uiToggleInstrumentSelect
        }  = this.props

        const trackid = tracks.ids.length + 1 // TODO use shortid to sync over network
        const loops = scenes.ids.reduce((loopSet, sceneid) => {
            return { ...loopSet, [getLoopId(sceneid, trackid)]: {...defaultLoop } }
        }, {})

        // temp
        trackAdd(trackid, { ...defaultTrack, name: trackid })
        instrumentAdd(trackid, instrument)
        loopSetAdd(loops)
        uiToggleInstrumentSelect(false)
    }

    render () {
        return (
            <div className='instruments-selector dragscroll'>
                {
                    availableInstruments.map((inst, index) =>
                        <InstView
                            key={index}
                            onClick={this.addInstrument.bind(null, inst)}
                            {...inst} />)
                }
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { trackAdd } from 'actions/tracks'
import { loopSetAdd } from 'actions/loops'
import { instrumentAdd } from 'actions/instruments'
import { uiToggleInstrumentSelect } from 'actions/ui'
export const InstrumentSelector = connect(
    (state) => ({
        scenes: state.scenes,
        tracks: state.tracks,
    }),
    {
        trackAdd,
        loopSetAdd,
        instrumentAdd,
        uiToggleInstrumentSelect,
    }
)(InstrumentSelectorView)
