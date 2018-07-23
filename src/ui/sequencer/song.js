import React from 'react'
import { Icon } from 'ui/common/icon'
import { InstrumentSelector } from 'ui/instruments/selector'

const getLoopId = (sceneid, trackid) => {
    return `${sceneid}:${trackid}`
}

export class Song extends React.Component {
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
        const newLoop = { notes: [], bars: 1 }
        const loops = tracks.ids.reduce((loopSet, trackid) => {
            return { ...loopSet, [getLoopId(sceneid, trackid)]: newLoop }
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
        const newLoop = { notes: [], bars: 1 }
        const loops = scenes.ids.reduce((loopSet, sceneid) => {
            return { ...loopSet, [getLoopId(sceneid, trackid)]: newLoop }
        }, {})

        trackAdd(trackid, { name: trackid })
        instrumentAdd(trackid, instrument)
        loopSetAdd(loops)
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
                                                return <SongLoop key={loopid} loopid={loopid} {...loops[loopid]} />
                                            })
                                        }
                                        <SongLoop placeholder />
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
import { uiToggleInstrumentSelect } from 'actions/ui'
export const SongView = connect(
    state => ({
        instrumentselect: state.ui.instrumentselect
    }), {
    sceneAdd,
    trackAdd,
    loopSetAdd,
    instrumentAdd,
    uiToggleInstrumentSelect
})(Song);

class SongSceneHead extends React.Component {
    render () {
        return (
            <div className='scene-head'>
                <Icon>play_arrow</Icon>
                <div>
                    {this.props.name}
                </div>
            </div>
        )
    }
}
class SongTrackHead extends React.Component {
    render () {
        return (
            <div className='track-head'>
                {this.props.name}
            </div>
        )
    }
}
class SongLoopSet extends React.Component {
    render () {
        return (
            <div className='loop-set'>
                {this.props.children}
            </div>
        )
    }
}
class SongLoop extends React.Component {
    render () {

        return (
            <div className={`loop ${this.props.placeholder ? 'placeholder' : ''}`}>
                { this.props.bars } { this.props.bars ? 'Bars' : '' } {this.props.loopid}
            </div>
        )
    }
}
class SongInstrument extends React.Component {
    render () {
        return (
            <div className='instrument'>
                {this.props.name}
            </div>
        )
    }
}

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
