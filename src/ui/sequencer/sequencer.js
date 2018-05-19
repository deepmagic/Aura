import React from 'react'
import { SeqHeader } from './header'
import { Song } from './song'
import { Pattern } from './pattern'
import { TransportControl } from './transport-control'

const song = {
    title: 'name',
    tempo: 120,
    timeSignature: 4,

    scenes: [
        {sceneid: 1, title: ''},
        {sceneid: 2, title: ''},
        {sceneid: 3, title: ''},
        {sceneid: 4, title: ''},
        {sceneid: 5, title: ''},
        {sceneid: 6, title: ''},
        {sceneid: 7, title: ''},
        {sceneid: 8, title: ''},
        {sceneid: 9, title: ''},
        {sceneid: 10, title: ''},
    ],

    tracks: [
        { trackid: 1, name: 'track', },
        { trackid: 2, name: 'track', },
        { trackid: 3, name: 'track', },
        { trackid: 4, name: 'track', },
        { trackid: 5, name: 'track', },
        { trackid: 6, name: 'track', },
        { trackid: 7, name: 'track', },
        { trackid: 8, name: 'track', },
        { trackid: 9, name: 'track', },
        { trackid: 10, name: 'track', },
        { trackid: 11, name: 'track', },
        { trackid: 12, name: 'track', },
        { trackid: 13, name: 'track', },
    ],

    loops: [
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
        [ { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 }, { notes: [], bars: 1 },],
    ]
}

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
        return (
            <div className='sequencer'>
                <SeqHeader />
                <Song    song={song}       style={ this.props.ui.expand ? hide : null } />
                <Pattern pattern={pattern} style={ this.props.ui.expand ? null : hide } />
                <TransportControl tempo={song.tempo} />
            </div>
        )
    }
}

import { connect } from 'react-redux'
export const Sequencer =
    connect((state) => ({ui: state.ui}), null)(SequencerView)
