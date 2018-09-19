import Tone from 'tone'
import { TRANSPORT_DEFAULT_BPM, TRANSPORT_DEFAULT_LOOPLENGTH } from 'controller/constants'
import { masterLevel } from 'actions/master'
import { trackLevels } from 'actions/tracks'
import { transportTime } from 'actions/transport'

export const Transport = (tracks) => {
    const masterMeter = new Tone.Meter()
    Tone.Master.connect(masterMeter)

    let levelLoop, cancelLevel, timeLoop, cancelLoop

    const transportInit = (dispatch) => {
        Tone.Transport.bpm.value = TRANSPORT_DEFAULT_BPM
        Tone.Transport.setLoopPoints(0, TRANSPORT_DEFAULT_LOOPLENGTH)
        Tone.Transport.loop = true

        // TODO cancel if ui isn't visible, start/stop based on visible ui
        levelLoop = () => {
            const trackids = []
            const levels = []

            for(const trackid in tracks.tracks) {
                trackids.push(trackid)
                const level = Tone.dbToGain(tracks.tracks[trackid].meter.getLevel())
                levels.push( {left: level, right: level} )
                // dispatch(trackLevels(trackid, {left: level, right: level}))
            }

            // TODO do not dispatch level changes if they are all at zero and keep levelLoop running when ui is visible
            const level = Tone.dbToGain(masterMeter.getLevel())
            dispatch(masterLevel(level))
            dispatch(trackLevels(trackids, levels))

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
        // TODO remove me
        setTimeout(() => cancelAnimationFrame(cancelLevel), 2000)
    }

    const transportStop = (dispatch) => {
        Tone.Transport.stop()
        dispatch(transportTime(0))
        cancelAnimationFrame(cancelLoop)
        // TODO remove me
        setTimeout(() => cancelAnimationFrame(cancelLevel), 2000)
    }

    const transportBpm = (bpm) => {
        Tone.Transport.bpm.value = bpm
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
