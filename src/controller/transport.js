import Tone from 'tone'
import { TRANSPORT_DEFAULT_BPM, TRANSPORT_DEFAULT_LOOPLENGTH } from 'controller/constants'
import { masterLevel } from 'actions/master'
import { transportTime } from 'actions/transport'

export const Transport = () => {
    const masterMeter = new Tone.Meter()
    Tone.Master.connect(masterMeter)

    let levelLoop, cancelLevel, timeLoop, cancelLoop

    const transportInit = (dispatch) => {
        Tone.Transport.bpm.value = TRANSPORT_DEFAULT_BPM
        Tone.Transport.setLoopPoints(0, TRANSPORT_DEFAULT_LOOPLENGTH)
        Tone.Transport.loop = true

        levelLoop = () => {
            const level = Tone.dbToGain(masterMeter.getLevel())
            dispatch(masterLevel(level))
            cancelLevel = requestAnimationFrame(levelLoop)
        }

        timeLoop = () => {
            dispatch(transportTime(Tone.Transport.progress))

            cancelLoop = requestAnimationFrame(timeLoop)
        }
    }

    const transportPlay = () => {
        Tone.Transport.start()
        timeLoop()
        levelLoop()
    }

    const transportPause = () => {
        Tone.Transport.pause()
        cancelAnimationFrame(cancelLoop)
        setTimeout(() => cancelAnimationFrame(cancelLevel), 2000)
    }

    const transportStop = (dispatch) => {
        Tone.Transport.stop()
        dispatch(transportTime(0))
        cancelAnimationFrame(cancelLoop)
        setTimeout(() => cancelAnimationFrame(cancelLevel), 2000)
    }

    const transportBpm = (bpm) => {
        Tone.transport.bpm = bpm
    }

    const transportLoopLength = (loopLength) => {
        Tone.Transport.setLoopPoints(0, loopLength)
    }

    return {
        transportInit,
        transportPlay,
        transportPause,
        transportStop,
        transportBpm,
        transportLoopLength,
    }
}
