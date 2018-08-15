import React from 'react'
import { Fader } from 'ui/common/fader'
import { Knob } from 'ui/common/knob'
import { Level } from 'ui/common/level'

export const TrackControls = ({track}) =>
    <div className='track-controls'>
        <div className='lhs'>
            <TrackVolume volume={track.volume} pan={track.pan} />
        </div>
        <div className='rhs'>
            <TrackSend send={track.send} levels={track.levels} />
        </div>
    </div>

const TrackVolume = ({volume, pan}) =>
    <div className='track-volume'>
        <div className='pan-knob'>
            <Knob rotation={pan} />
        </div>
        <div className='volume'>
            <Fader level={volume} />
        </div>
        <div className='buttons'>
            <button>Solo</button>
            <button>Mute</button>
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
