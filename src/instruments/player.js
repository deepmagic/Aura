import Tone from 'tone'

export const Player = (samples) => {

    const instrument = new Tone.Players(samples)

    const keyMap = Object.keys(samples)
    const keys = () => {
        return keyMap
    }

    const play = (time, note) => {
        const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
        instrument.get(note.n + (note.o - 1)).start(time, 0, duration, note.v)
    }

    return {
        instrument,
        keys,
        play,
    }
}
