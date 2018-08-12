import React from 'react'

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
            <button>iFX</button>
        </div>
    </div>

const TrackLevels = ({levels}) =>
    <div className='levels'>
        <div className='left'>
            <LevelIndicator level={levels.left} />
        </div>
        <div className='right'>
            <LevelIndicator level={levels.right} />
        </div>
    </div>

// common

const Fader = ({level}) =>
    <div className='fader'>
        <div
            className='slider-wrap'
            style={{ transform: `translateY(${100 - level}%)` }}>
            <div className='slider'>
                <div className='bar' />
            </div>
        </div>
    </div>

const LevelIndicator = ({level}) =>
    <div className='level-indicator'>
        <div className='indicator' style={{ transform: `translateY(${100 - level}%)` }} />
    </div>

const Knob = ({rotation}) =>
    <div className='knob'>
        <div className='handle'>
            <div
                className='dot'
                style={{ transform: `rotateZ(${rotation}deg)` }} />
        </div>
    </div>
