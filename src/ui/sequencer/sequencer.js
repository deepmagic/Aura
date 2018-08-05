import React from 'react'
import { SeqHeader } from './header'
import { InstrumentSelector } from 'ui/instruments/selector'
import { Song } from './song'
import { Pattern } from './pattern'
import { TransportControl } from './transport-control'

const TIMESIG = 4

// TODO fix pattern to accept no pattern and get rid of this
const placeholderPattern = { bars: 1, notes: [] }
const hide = { display: 'none' }

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
                { ui.instrumentselect && <InstrumentSelector /> }
                <Pattern
                    loopid={loopActive}
                    pattern={loops[loopActive] || placeholderPattern }
                    timesig={TIMESIG}
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
    {
        uiToggleSongPattern,
    }
)(SequencerView)
