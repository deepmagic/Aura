import React from 'react'
import { Icon } from 'ui/common/icon'
import { InstrumentSelector } from 'ui/instruments/selector'
import { SongLoop } from 'ui/sequencer/song-loop'

const getLoopId = (sceneid, trackid) =>
    `${sceneid}:${trackid}`

const defaultLoop = {
    bars: 4,
    notes: [
        { n: 'C',  o: 9, v: 0.9, on: '0:0:0.0', off: '0:0:1.0' },
        { n: 'D#', o: 9, v: 0.9, on: '1:0:0.0', off: '1:0:1.0' },
        { n: 'E',  o: 4, v: 0.9, on: '1:1:0.0', off: '1:1:1.0' },
        { n: 'C',  o: 9, v: 0.9, on: '2:0:0.0', off: '2:0:1.0' },
        { n: 'D#', o: 1, v: 0.5, on: '3:0:0.0', off: '3:0:1.0' },
    ]
}

class SongView extends React.Component {
    constructor () {
        super()
        this.onScroll = this.onScroll.bind(this)
        this.lockscroll = '__lock_scroll__'
    }
    unlockScroll (...args) {
        args.forEach(el => {
            delete el[this.lockscroll]
        })
    }
    lockScroll (...args) {
        args.forEach(el => {
            el[this.lockscroll] = true
        })

        clearTimeout(this.scrollLock)
        this.scrollLock = setTimeout(this.unlockScroll.bind(this, ...args), 100)
    }
    onScroll (event) {
        if (event.target === this.trackheads && !this.trackheads[this.lockscroll]) {
            this.loops.scrollLeft       = event.target.scrollLeft
            this.instruments.scrollLeft = event.target.scrollLeft
            this.lockScroll(this.loops, this.instruments)
        } else if (event.target === this.loops && !this.loops[this.lockscroll]) {
            this.sceneheads.scrollTop   = event.target.scrollTop
            this.trackheads.scrollLeft  = event.target.scrollLeft
            this.instruments.scrollLeft = event.target.scrollLeft
            this.lockScroll(this.sceneheads, this.trackheads, this.instruments)
        } else if (event.target === this.sceneheads && !this.sceneheads[this.lockscroll]) {
            this.loops.scrollTop        = event.target.scrollTop
            this.lockScroll(this.loops)
        } else if (event.target === this.instruments && !this.instruments[this.lockscroll]) {
            this.trackheads.scrollLeft  = event.target.scrollLeft
            this.loops.scrollLeft       = event.target.scrollLeft
            this.lockScroll(this.trackheads, this.loops)
        }
    }

    addScene = (copy = false) => {
        const {
            sceneAdd,
            loopSetAdd,
            scenes,
            tracks
        } = this.props
        const sceneid = scenes.ids.length + 1
        const loops = tracks.ids.reduce((loopSet, trackid) => {
            return { ...loopSet, [getLoopId(sceneid, trackid)]: {...defaultLoop} }
        }, {})

        sceneAdd(sceneid, { name: sceneid })
        loopSetAdd(loops)
    }
    addInstrument = (instrument = {}) => {
        const {
            trackAdd,
            loopSetAdd,
            instrumentAdd,
            scenes,
            tracks,
            instruments,
            uiToggleInstrumentSelect
        }  = this.props

        uiToggleInstrumentSelect(false)
        const trackid = tracks.ids.length + 1
        const loops = scenes.ids.reduce((loopSet, sceneid) => {
            return { ...loopSet, [getLoopId(sceneid, trackid)]: {...defaultLoop} }
        }, {})

        trackAdd(trackid, { name: trackid })
        instrumentAdd(trackid, instrument)
        loopSetAdd(loops)
    }
    editLoop = (loopid) => {
        this.props.setActiveLoop(loopid)
        this.props.uiToggleSongPattern()
    }

    render = () => {
        const {
            song,
            scenes,
            tracks,
            loops,
            instruments,
            style
        } = this.props

        return (
            <React.Fragment>
                <InstrumentSelector
                    style={this.props.instrumentselect ? null : {display: 'none'}}
                    select={this.addInstrument} />
                <div className='song' style={style}>
                    <div className='song-header dragscroll'>
                        <div className='track-head fixed'>
                            Scene
                        </div>
                        <div className='track-heads dragscroll' ref={th => this.trackheads = th} onScroll={this.onScroll}>
                            {
                                tracks.ids.map((trackid) => <SongTrackHead key={trackid} {...tracks[trackid]} />)
                            }
                            <SongTrackHead />
                        </div>
                    </div>
                    <div className='song-content'>
                        <div className='scene-heads dragscroll' ref={sh => this.sceneheads = sh} onScroll={this.onScroll}>
                            {
                                scenes.ids.map((sceneid) => <SongSceneHead key={sceneid} {...scenes[sceneid]} />)
                            }
                            <SceneAdd add={this.addScene} copy={this.addScene.bind(this, true)} />
                        </div>
                        <div className='loops dragscroll' ref={ls => this.loops = ls} onScroll={this.onScroll}>
                            {
                                scenes.ids.map(sceneid =>
                                    <SongLoopSet key={sceneid}>
                                        {
                                            tracks.ids.map(trackid => {
                                                const loopid = getLoopId(sceneid, trackid)

                                                return (
                                                    <SongLoop
                                                        key={loopid}
                                                        loop={loops[loopid]}
                                                        loopid={loopid}
                                                        onClick={() => this.editLoop(loopid)} />
                                                )
                                            })
                                        }
                                        <SongLoop />
                                    </SongLoopSet>
                                )
                            }
                            <SongLoopSet />
                        </div>
                    </div>
                    <div className='song-footer'>
                        <div className='instrument fixed'>
                            Master
                        </div>
                        <div className='instruments dragscroll' ref={ns => this.instruments = ns} onScroll={this.onScroll}>
                            {
                                instruments.ids.map((instid) => <SongInstrument key={instid} {...instruments[instid]} />)
                            }
                            <InstrumentAdd num='add' add={this.props.uiToggleInstrumentSelect.bind(null, true)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

import { connect } from 'react-redux'
import { sceneAdd } from 'actions/scenes'
import { trackAdd } from 'actions/tracks'
import { loopSetAdd } from 'actions/loops'
import { instrumentAdd } from 'actions/instruments'
import { uiToggleSongPattern, uiToggleInstrumentSelect } from 'actions/ui'
import { setActiveLoop } from 'actions/loops'
export const Song = connect(
    state => ({
        instrumentselect: state.ui.instrumentselect
    }), {
    sceneAdd,
    trackAdd,
    loopSetAdd,
    setActiveLoop,
    instrumentAdd,
    uiToggleSongPattern,
    uiToggleInstrumentSelect,
})(SongView)

const SongSceneHead = ({name}) =>
    <div className='scene-head'>
        <Icon>play_arrow</Icon>
        <div>
            {name}
        </div>
    </div>

const SongTrackHead = ({name}) =>
    <div className='track-head'>
        {name}
    </div>

const SongLoopSet = ({children}) =>
    <div className='loop-set'>
        {children}
    </div>

const SongInstrument = ({name}) =>
    <div className='instrument'>
        {name}
    </div>

const SceneAdd = ({add, copy}) =>
    <div className='scene-add'>
        <Icon onClick={add}>add_circle_outline</Icon>
        <Icon onClick={copy}>filter_none</Icon>
    </div>

const InstrumentAdd = ({add}) =>
    <div className='instrument-add'>
        <div className='outline' onClick={add}>
            <Icon>add_circle_outline</Icon>
        </div>
    </div>
