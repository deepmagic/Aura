import React from 'react'
import { Fader } from 'ui/common/fader'
import { Knob } from 'ui/common/knob'
import { Level } from 'ui/common/level'

export class TrackControlsView extends React.Component {
    onTrackMute = () => {
        const { trackMute, track, trackid } = this.props
        trackMute(trackid, !track.mute)
    }

    onTrackSolo = () => {
        const { trackSolo, track, trackid } = this.props
        trackSolo(trackid, !track.solo)
    }

    render () {
        const {track} = this.props

        return (
            <div className='track-controls'>
                <div className='lhs'>
                    <TrackVolume
                        onMute={this.onTrackMute}
                        onSolo={this.onTrackSolo}
                        mute={track.mute}
                        solo={track.solo}
                        pan={track.pan}
                        volume={track.volume} />
                </div>
                <div className='rhs'>
                    <TrackSend send={track.send} levels={track.level} />
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { trackMute, trackSolo } from 'actions/tracks'
export const TrackControls = connect(
    null,
    {
        trackMute,
        trackSolo,
    }
)(TrackControlsView)

const TrackVolume = ({volume, pan, onMute, mute, onSolo, solo}) =>
    <div className='track-volume'>
        <div className='pan-knob'>
            <Knob rotation={pan} />
        </div>
        <div className='volume'>
            <Fader level={volume} />
        </div>
        <div className='buttons'>
            <button onClick={onSolo} className={solo ? 'active' : ''}>Solo</button>
            <button onClick={onMute} className={mute ? 'active' : ''}>Mute</button>
        </div>
    </div>

const TrackSend = ({send, levels}) =>
    <div className='track-send'>
        <div className='send-knob'>
            <Knob rotation={send} />
        </div>
        <div className='send' >
            <TrackLevels levels={levels} />
        </div>
        <div className='buttons'>
            <button>MIDI</button>
            <button>IFX</button>
        </div>
    </div>

export const TrackLevels = ({levels}) =>
    <div className='levels'>
        <div className='left'>
            <Level level={levels.left} />
        </div>
        <div className='right'>
            <Level level={levels.right} />
        </div>
    </div>
