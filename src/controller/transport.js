import Tone from 'tone'
import { masterLevel } from 'actions/master'
import { transportTime } from 'actions/transport'

Tone.Transport.bpm.value = 120
Tone.Transport.setLoopPoints(0, '2m')
Tone.Transport.loop = true

export const Transport = () => {
    const masterMeter = new Tone.Meter()
    Tone.Master.connect(masterMeter)

    let levelLoop, cancelLevel, timeLoop, cancelLoop

    const transportInit = (dispatch) => {
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

    return {
        transportInit,
        transportPlay,
        transportPause,
        transportStop,
    }
}
