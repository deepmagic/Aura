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

    onMidi = () => {
        const { midi, midiSetTrack, trackid } = this.props
        midiSetTrack(trackid === midi.trackid ? null : trackid)
    }

    render () {
        const { midi, track, trackid } = this.props

        return (
            <div className='track-controls'>
                <div className='lhs'>
                    <TrackVolume
                        onMidi={this.onMidi}
                        midiActive={midi.trackid === trackid}
                        onSolo={this.onTrackSolo}
                        solo={track.solo}
                        pan={track.pan}
                        volume={track.volume} />
                </div>
                <div className='rhs'>
                    <TrackSend
                        onMute={this.onTrackMute}
                        mute={track.mute}
                        send={track.send}
                        levels={track.level} />
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { trackMute, trackSolo } from 'actions/tracks'
import { midiSetTrack } from 'actions/midi'
export const TrackControls = connect(
    (state) => ({
        midi: state.midi
    }),
    {
        trackMute,
        trackSolo,
        midiSetTrack,
    }
)(TrackControlsView)

const TrackVolume = ({volume, pan, onMidi, midiActive, onSolo, solo}) =>
    <div className='track-volume'>
        <div className='pan-knob'>
            <Knob rotation={pan} />
        </div>
        <div className='volume'>
            <Fader level={volume} />
        </div>
        <div className='buttons'>
            <button onClick={onSolo} className={solo ? 'active' : ''}>Solo</button>
            <button onClick={onMidi} className={midiActive ? 'active' : ''}>MIDI</button>
        </div>
    </div>

const TrackSend = ({send, levels, onMute, mute}) =>
    <div className='track-send'>
        <div className='send-knob'>
            <Knob rotation={send} />
        </div>
        <div className='send' >
            <TrackLevels levels={levels} />
        </div>
        <div className='buttons'>
            <button onClick={onMute} className={mute ? 'active' : ''}>Mute</button>
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
