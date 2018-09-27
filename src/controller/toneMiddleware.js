import {
    LOOP_SET_ADD,
    LOOP_ADD_NOTE,
    LOOP_DEL_NOTE,
    LOOP_SET_BARS,
} from 'actions/loops'

import {
    INSTRUMENT_ADD
} from 'actions/instruments'

import {
    MIDI_SET_TRACK,
    MIDI_NOTE_ON,
    MIDI_NOTE_OFF,
    MIDI_CTRL_CHANGE,
} from 'actions/midi'

import {
    TRACK_ADD,
    TRACK_DEL,
    TRACK_MUTE,
    TRACK_SOLO,
} from 'actions/tracks'

import {
    SCENE_SET_ACTIVE,
} from 'actions/scenes'

import {
    TRANSPORT_INIT,
    TRANSPORT_PLAY,
    TRANSPORT_PAUSE,
    TRANSPORT_STOP,
    TRANSPORT_BPM,
    TRANSPORT_LOOP_LENGTH,
} from 'actions/transport'

import { Controller } from './controller'
const ToneController = Controller()

export const toneMiddleware = store => next => action => {
    // TODO something besides switch
    switch(action.type) {
    // INSTRUMENTS
        case INSTRUMENT_ADD:
            ToneController.instrumentAdd(action)
            break
    // LOOPS
        case LOOP_SET_ADD:
            ToneController.loopAdd(action, store)
            break
        case LOOP_ADD_NOTE:
            ToneController.loopAddNote(action)
            break
        case LOOP_DEL_NOTE:
            ToneController.loopDelNote(action)
            break
        case LOOP_SET_BARS:
            ToneController.loopSetBars(action)
            break
    // MIDI - TODO move to separate middleware
        case MIDI_SET_TRACK:
            ToneController.midiSetTrack(action.trackid)
            break
        case MIDI_NOTE_ON:
            ToneController.midiNoteOn(action.data, store)
            break
        case MIDI_NOTE_OFF:
            ToneController.midiNoteOff(action.data, store)
            break
        case MIDI_CTRL_CHANGE:
            ToneController.midiCtrlChange(action.data, store)
            break
    // SCENES
        case SCENE_SET_ACTIVE:
            ToneController.sceneSetActive(action.sceneid, store)
            break
    // TRACKS
        case TRACK_ADD:
            ToneController.trackAdd(action)
            break
        case TRACK_DEL:
            ToneController.trackDel(action)
            break
        case TRACK_MUTE:
            ToneController.trackMute(action)
            break
        case TRACK_SOLO:
            ToneController.trackSolo(action)
            break
    // TRANSPORT
        case TRANSPORT_INIT:
            ToneController.transportInit(store)
            break
        case TRANSPORT_PLAY:
            ToneController.transportPlay()
            break
        case TRANSPORT_PAUSE:
            ToneController.transportPause()
            break
        case TRANSPORT_STOP:
            ToneController.transportStop(store)
            break
        case TRANSPORT_BPM:
            ToneController.transportBpm(action.bpm)
            break
        case TRANSPORT_LOOP_LENGTH:
            ToneController.transportLoopLength(action.loopLength)
            break
    }

    next(action)
}
