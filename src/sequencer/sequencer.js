import React from 'react'
import { SeqHeader } from './header'
import { SeqSong } from './song'
import { SeqPlayControl } from './play-control'

const song = {
    title: 'name',
    tempo: 120,

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

export class Sequencer extends React.Component {

    render () {
        return (
            <div className='sequencer'>
                <SeqHeader />
                <SeqSong song={song} />
                <SeqPlayControl tempo={song.tempo} />
            </div>
        )
    }
}
