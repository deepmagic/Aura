import Tone from 'tone'
import { TRANSPORT_DEFAULT_BPM, TRANSPORT_DEFAULT_LOOPLENGTH } from 'controller/constants'
import { masterLevel } from 'actions/master'
import { sceneSetActive } from 'actions/scenes'
import { trackLevels } from 'actions/tracks'
import { transportStop as transportStopAction, transportTime } from 'actions/transport'

export const Transport = (tracks) => {
    const masterMeter = new Tone.Meter()
    Tone.Master.connect(masterMeter)

    let levelLoop, cancelLevel, timeLoop, cancelLoop

    const transportInit = (store) => {
        const { dispatch } = store
        Tone.Transport.bpm.value = TRANSPORT_DEFAULT_BPM
        Tone.Transport.setLoopPoints(0, TRANSPORT_DEFAULT_LOOPLENGTH)
        Tone.Transport.loop = true

        Tone.Transport.on('loopEnd', () => {
            Tone.Transport.scheduleOnce(playOrRepeat(store), 0)
        })

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

    const playOrRepeat = (store) => {
        const {
            scenes,
            sceneActive,
            transport: { repeat }
        } = store.getState()

        if (!repeat) {
            const nextSceneId = sceneActive + 1

            if (scenes[nextSceneId]) {
                store.dispatch(sceneSetActive(nextSceneId))
            } else {
                Tone.Transport.stop() // must stop immediately or Tone will play the first note 
                store.dispatch(transportStopAction())
            }
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

    const transportStop = (store) => {
        Tone.Transport.stop()
        store.dispatch(transportTime(0))
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
