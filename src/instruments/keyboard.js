import Tone from 'tone'

export const Keyboard = (instrument) => {
    const play = (time, note) => {
        const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
        instrument.triggerAttackRelease(note.n + note.o, duration, time, note.v)
    }

    const midiOn = (data) => {
        instrument.triggerAttack(`${data.note.name}${data.note.octave}`, undefined, data.velocity)
    }

    const midiOff = (data) => {
        instrument.triggerRelease(`${data.note.name}${data.note.octave}`)
    }

    return {
        midiOn,
        midiOff,
        play,
        instrument,
    }
}
