import React from 'react'
import { SeqHeader } from './header'
import { Song } from './song'
import { Pattern } from './pattern'
import { TransportControl } from './transport-control'

// on/off time bar:beat:sixteenths
// https://tonejs.github.io/docs/r12/Type#barsbeatssixteenths
const pattern = {
    bars: 4,
    notes: [
        { n: 'C',  o: 9, v: 0.9, on: '0:0:0.0', off: '0:0:1.0' },
        { n: 'D#', o: 9, v: 0.9, on: '1:0:0.0', off: '1:0:1.0' },
        { n: 'C',  o: 9, v: 0.9, on: '2:0:0.0', off: '2:0:1.0' },
        { n: 'D#', o: 9, v: 0.5, on: '3:0:0.0', off: '3:0:1.0' },
    ]
}
// TODO fix pattern to accept no pattern and get rid of this
const placeholderPattern = { bars: 1, notes: [] }
const hide = {
    display: 'none'
}

export class SequencerView extends React.Component {
    render () {
        const {
            song,
            scenes,
            tracks,
            loops,
            loopActive,
            instruments,
            ui,
            uiToggleSongPattern
        } = this.props

        return (
            <div className='sequencer'>
                <SeqHeader
                    onBack={() => uiToggleSongPattern() }
                    songpattern={ui.songpattern} />
                <Song
                    song={song}
                    scenes={scenes}
                    tracks={tracks}
                    loops={loops}
                    instruments={instruments}
                    style={ ui.songpattern || ui.instrumentselect ? hide : null } />
                <Pattern
                    pattern={loops[loopActive] || placeholderPattern }
                    style={ !ui.songpattern ? hide : null } />
                <TransportControl
                    style={ ui.instrumentselect ? hide : null }
                    {...song} />
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { uiToggleSongPattern } from 'actions/ui'
export const Sequencer = connect(
    (state) => ({
        ui: state.ui,
        song: state.song,
        scenes: state.scenes,
        tracks: state.tracks,
        instruments: state.instruments,
        loops: state.loops,
        loopActive: state.loopActive,
    }),
    { uiToggleSongPattern }
)(SequencerView)
