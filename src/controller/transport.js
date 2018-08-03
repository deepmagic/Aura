import Tone from 'tone'

export const Transport = () => {

    const transportPlay = () => Tone.Transport.start()
    const transportPause = () => Tone.Transport.pause()
    const transportStop = () => Tone.Transport.stop()

    return {
        transportPlay,
        transportPause,
        transportStop
    }
}
