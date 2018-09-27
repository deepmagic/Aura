import React from 'react'
import { Icon } from 'ui/common/icon'
import { SongLoop } from 'ui/sequencer/song-loop'
import { TrackControls, TrackLevels } from 'ui/sequencer/track-controls'
import { getLoopId } from 'ui/sequencer/utils'
import { defaultLoop } from 'ui/sequencer/constants'

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
            this.instruments.scrollTop  = 0 // keep top locked at zero
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
        this.props.sceneSetActive(sceneid)
    }

    render = () => {
        const {
            // song,
            expand,
            scenes,
            sceneActive,
            tracks,
            loops,
            instruments,
            masterLevel,
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
                <div className={`song-footer ${expand ? 'expand' : ''}`}>
                    <TrackMaster level={masterLevel} />
                    <div className='instruments dragscroll' ref={ns => this.instruments = ns} onScroll={this.onScroll}>
                        {
                            instruments.ids.map((trackid) =>
                                <SongInstrument
                                    key={trackid}
                                    trackid={trackid}
                                    track={tracks[trackid]}
                                    {...instruments[trackid]} />)
                        }
                        <InstrumentAdd add={this.props.uiToggleInstrumentSelect.bind(null, true)} />
                    </div>
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { sceneAdd, sceneSetActive } from 'actions/scenes'
import { trackAdd } from 'actions/tracks'
import { loopSetAdd, setActiveLoop } from 'actions/loops'
import { uiToggleSongPattern, uiToggleInstrumentSelect } from 'actions/ui'
export const Song = connect(
    state => ({
        expand: state.ui.expand,
        masterLevel: state.masterLevel,
        sceneActive: state.sceneActive,
        transportTime: state.transportTime,
    }),
    {
        sceneAdd,
        sceneSetActive,
        trackAdd,
        loopSetAdd,
        setActiveLoop, // rename me
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

const SongInstrument = ({name, image, track, trackid}) =>
    <div className='instrument'>
        <div className='title'>
            {name}
        </div>
        <div className='image'>
            <img src={image} />
        </div>
        <TrackControls trackid={trackid} track={track} />
    </div>

const SceneAdd = ({add, copy}) =>
    <div className='scene-add'>
        <Icon onClick={add}>add_circle_outline</Icon>
        <Icon onClick={copy}>filter_none</Icon>
    </div>

const TrackMaster = ({level}) =>
    <div className='instrument fixed'>
        <div className='title'>
            Master
        </div>
        <div className='master-track'>
            <TrackLevels levels={{ left: level, right: level}} />
        </div>
    </div>

const InstrumentAdd = ({add}) =>
    <div className='instrument-add'>
        <div className='outline' onClick={add}>
            <Icon>add_circle_outline</Icon>
        </div>
    </div>
