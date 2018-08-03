import Tone from 'tone'
import { transportTime } from 'actions/transport'

export const Transport = () => {
    let timeLoop, cancelLoop

    const transportInit = (dispatch) => {
        timeLoop = () => {
            dispatch(transportTime(Tone.Transport.progress))
            cancelLoop = requestAnimationFrame(timeLoop)
        }
    }

    const transportPlay = () => {
        Tone.Transport.start()
        timeLoop()
    }

    const transportPause = () => {
        Tone.Transport.pause()
        cancelAnimationFrame(cancelLoop)
    }

    const transportStop = (dispatch) => {
        Tone.Transport.stop()
        dispatch(transportTime(0))
        cancelAnimationFrame(cancelLoop)
    }

    return {
        transportInit,
        transportPlay,
        transportPause,
        transportStop,
    }
}
