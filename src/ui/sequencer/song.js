import React from 'react'

const getLoopid = (sceneid, trackid) => {
    return `${sceneid}:${trackid}`
}

export class Song extends React.Component {
    constructor() {
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
    onScroll(event) {
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
    render() {
        const { song, scenes, tracks, loops, instruments, style } = this.props

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
                            scenes.ids.map((sceneid) => <SongSceneHead key={sceneid} {...scenes[sceneid]} />)
                        }
                        <SongSceneHead sceneid='Add Scene' />
                    </div>
                    <div className='loops dragscroll' ref={ls => this.loops = ls} onScroll={this.onScroll}>
                        {
                            scenes.ids.map(sceneid =>
                                <SongLoopSet key={sceneid}>
                                    {
                                        tracks.ids.map(trackid => {
                                            const loopid = getLoopid(sceneid, trackid)
                                            return <SongLoop key={loopid} {...loops[loopid]} />
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
                        <SongInstrument num='add' />
                    </div>
                </div>
            </div>
        )
    }
}
class SongSceneHead extends React.Component {
    render() {
        return (
            <div className='scene-head'>
                {this.props.name}
            </div>
        )
    }
}
class SongTrackHead extends React.Component {
    render() {
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
    render() {
        return (
            <div className='loop'>
                Loop { this.props.bars }
            </div>
        )
    }
}
class SongInstrument extends React.Component {
    render() {
        return (
            <div className='instrument'>
                {this.props.name}
            </div>
        )
    }
}
