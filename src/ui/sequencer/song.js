import React from 'react'
import { Icon } from 'ui/common/icon'
import { SongLoop } from 'ui/sequencer/song-loop'
import { getLoopId } from 'ui/sequencer/utils'

const defaultLoop = {
    bars: 1,
    notes: [
        /*
        { n: 'C',  o: 9, v: 0.9, on: '0:0:0.0', off: '0:0:1.0' },
        { n: 'D#', o: 9, v: 0.9, on: '1:0:0.0', off: '1:0:1.0' },
        { n: 'E',  o: 4, v: 0.9, on: '1:1:0.0', off: '1:1:1.0' },
        { n: 'C',  o: 9, v: 0.9, on: '2:0:0.0', off: '2:0:1.0' },
        { n: 'D#', o: 1, v: 0.5, on: '3:0:0.0', off: '3:0:1.0' },

        { n: 'C',  o: 3, v: 0.9, on: '0:0:0.0',  off: '0:0:1.0' },
        { n: 'E',  o: 3, v: 0.9, on: '0:0:2.0',  off: '0:0:3.0' },
        { n: 'G',  o: 3, v: 0.9, on: '0:0:4.0',  off: '0:0:5.0' },
        { n: 'B',  o: 3, v: 0.9, on: '0:0:6.0',  off: '0:0:7.0' },
        { n: 'C',  o: 4, v: 0.9, on: '0:0:8.0',  off: '0:0:9.0' },
        { n: 'B',  o: 3, v: 0.9, on: '0:0:10.0', off: '0:0:11.0' },
        { n: 'G',  o: 3, v: 0.9, on: '0:0:12.0', off: '0:0:13.0' },
        { n: 'E',  o: 3, v: 0.9, on: '0:0:14.0', off: '0:0:15.0' },
        */
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

    addScene = (/*copy = false*/) => {
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
    editLoop = (loopid) => {
        this.props.setActiveLoop(loopid)
        this.props.uiToggleSongPattern()
    }
    setScene = (sceneid) => {
        // TODO sync change end of this scene
        this.props.setActiveScene(sceneid)
    }

    render = () => {
        const {
            // song,
            scenes,
            sceneActive,
            tracks,
            loops,
            instruments,
            style,
            transportTime,
        } = this.props
        const playTime = transportTime * 100

        return (
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
                            scenes.ids.map((sceneid) =>
                                <SongSceneHead
                                    key={sceneid}
                                    active={sceneActive === sceneid}
                                    playTime={playTime}
                                    onClick={this.setScene.bind(this, sceneid)}
                                    {...scenes[sceneid]} />)
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
                                                    active={sceneActive === sceneid}
                                                    playTime={playTime}
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
                            instruments.ids.map((instid) =>
                                <SongInstrument
                                    key={instid}
                                    {...instruments[instid]} />)
                        }
                        <InstrumentAdd add={this.props.uiToggleInstrumentSelect.bind(null, true)} />
                    </div>
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { sceneAdd, setActiveScene } from 'actions/scenes'
import { trackAdd } from 'actions/tracks'
import { loopSetAdd, setActiveLoop } from 'actions/loops'
import { uiToggleSongPattern, uiToggleInstrumentSelect } from 'actions/ui'
export const Song = connect(
    state => ({
        sceneActive: state.sceneActive,
        transportTime: state.transportTime,
    }),
    {
        sceneAdd,
        setActiveScene,
        trackAdd,
        loopSetAdd,
        setActiveLoop,
        uiToggleSongPattern,
        uiToggleInstrumentSelect,
    }
)(SongView)

const SongScenePlayhead = ({x}) =>
    <div className='playhead' style={{ transform: `translateX(${x}%)` }} />

const SongSceneHead = ({name, active, playTime, onClick}) =>
    <div className={`scene-head`} onClick={onClick}>
        {active && <SongScenePlayhead x={playTime} />}
        <Icon>play_arrow</Icon>
        <div>{name}</div>
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
