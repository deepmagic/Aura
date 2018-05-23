import React from 'react'
import { SeqHeader } from './header'
import { SongView } from './song'
import { Pattern } from './pattern'
import { TransportControl } from './transport-control'

const pattern = {
    bars: 4,
    notes: [
        { n: 'C',  o: 9, v: 0.9, on: '0:0:0.0', off: '0:0:1.0' },
        { n: 'D#', o: 9, v: 0.9, on: '1:0:0.0', off: '1:0:1.0' },
        { n: 'C',  o: 9, v: 0.9, on: '2:0:0.0', off: '2:0:1.0' },
        { n: 'D#', o: 9, v: 0.5, on: '3:0:0.0', off: '3:0:1.0' },
    ]
}
const hide = {
    display: 'none'
}

export class SequencerView extends React.Component {

    render () {
        const { song, scenes, tracks, loops, instruments } = this.props

        return (
            <div className='sequencer'>
                <SeqHeader />
                <SongView
                    song={song}
                    scenes={scenes}
                    tracks={tracks}
                    loops={loops}
                    instruments={instruments}
                    style={ this.props.ui.songpattern ? hide : null } />
                <Pattern
                    pattern={pattern}
                    style={ this.props.ui.songpattern ? null : hide } />
                <TransportControl tempo={song.tempo} />
            </div>
        )
    }
}

import { connect } from 'react-redux'
export const Sequencer = connect(
    (state) => ({
        ui: state.ui,
        song: state.song,
        scenes: state.scenes,
        tracks: state.tracks,
        instruments: state.instruments,
        loops: state.loops,
    }),
    null
)(SequencerView)
