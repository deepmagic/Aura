import Tone from 'tone'

export const transportController = () => {
    let paused = false
    const record = () => {
        console.log('record')
    }
    const stop = () => {
        Tone.Transport.stop()
    }
    const playpause = () => {
        if (!paused && Tone.Transport.ticks) {
            Tone.Transport.pause()
            paused = true
        } else {
            Tone.Transport.start()
            paused = false
        }
    }
    const toggleRepeat = () => {
        console.log('toggleRepeat')
    }
    const isPaused = () => {
        return paused
    }

    return {
        record,
        stop,
        playpause,
        toggleRepeat,
        isPaused,
    }
}

const fmSynth = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
fmSynth.set({oscillator: {type: 'sawtooth'}})

function loopCallback(time) {
	console.log("loop", time, Tone.Transport.position, Tone.Transport.progress)
    fmSynth.triggerAttackRelease('C2','16n');
}

// Tone.Transport.bpm.value = 120
Tone.Transport.setLoopPoints(0, '4m')
Tone.Transport.loop = true

var loop = new Tone.Loop(loopCallback, '1m')
loop.start(0)
