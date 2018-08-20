import Tone from 'tone'

export const PolySynth = () => {
    const instrument = new Tone.PolySynth(6, Tone.AMSynth)
    instrument.set({oscillator: {type: 'sawtooth'}})

    const play = (time, note) => {
        const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
        instrument.triggerAttackRelease(note.n + note.o, duration, time, note.v)
    }

    return {
        play,
        instrument,
    }
}
