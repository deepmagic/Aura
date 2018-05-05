import React from 'react'

export class SeqSong extends React.Component {

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
        const { song: { scenes, tracks, loops } } = this.props

        return (
            <div className='song'>
                <div className='song-header dragscroll'>
                    <div className='track-head scene'>
                        scene
                    </div>
                    <div className='track-heads dragscroll' ref={th => this.trackheads = th} onScroll={this.onScroll}>
                        {
                            tracks &&
                            tracks.map((track) => <SeqTrackHead key={track.trackid} {...track} />)
                        }
                    </div>
                </div>
                <div className='song-content'>
                    <div className='scene-heads dragscroll' ref={sh => this.sceneheads = sh} onScroll={this.onScroll}>
                        {
                            scenes &&
                            scenes.map((scene) => <SeqSceneHead key={scene.sceneid} {...scene} />)
                        }
                    </div>
                    <div className='loops dragscroll' ref={ls => this.loops = ls} onScroll={this.onScroll}>
                        {
                            loops &&
                            loops.map((set, setid) => {
                                return (
                                    <SeqLoopSet key={setid}>
                                        { set.map((loop, loopid) => <SeqLoop key={loopid} {...loop} />) }
                                    </SeqLoopSet>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='song-footer'>
                    <div className='instrument scene'>
                        master
                    </div>
                    <div className='instruments dragscroll' ref={ns => this.instruments = ns} onScroll={this.onScroll}>
                        {
                            tracks &&
                            tracks.map((track) => <SeqInstrument key={track.trackid} num={track.trackid} {...track} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
class SeqSceneHead extends React.Component {
    render() {
        const { sceneid } = this.props

        return (
            <div className='scene-head'>
                Scene Head {sceneid}
            </div>
        )
    }
}
class SeqTrackHead extends React.Component {
    render() {
        const { name, trackid } = this.props
        return (
            <div className='track-head'>
                {name} {trackid}
            </div>
        )
    }
}
class SeqLoopSet extends React.Component {
    render () {
        return <div className='loop-set'>{this.props.children}</div>
    }
}
class SeqLoop extends React.Component {
    render() {
        return (
            <div className='loop'>
                Loop { this.props.bars }
            </div>
        )
    }
}
class SeqInstrument extends React.Component {
    render() {
        return (
            <div className='instrument'>
                Instrument { this.props.num }
            </div>
        )
    }
}
