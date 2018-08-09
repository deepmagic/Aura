import Tone from 'tone'

export const Player = () => {
    /*
    const samples = {
    	'C9': 'samples/linndrum1/Kick LinnDrum 1.wav',
        'C#9': 'samples/linndrum1/ClosedHH LinnDrum 1.wav',
        'D9': 'samples/linndrum1/Snare LinnDrum 1.wav',
    }
    */
    const samples = {
    	'C9': 'samples/808/808-Kicks34.wav',
        'C#9': 'samples/808/808-HiHats01.wav',
        'D9': 'samples/808/808-Snare10.wav',
    }
    const instrument = new Tone.Players(samples).toMaster()
    const keyMap = Object.keys(samples)

    const keys = () => {
        return keyMap
    }

    const play = (time, note) => {
        const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
        instrument.get(note.n + (note.o - 1)).start(time, 0, duration, note.v)
    }

    return {
        keys,
        play,
        instrument,
    }
}
