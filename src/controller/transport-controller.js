// bottom bar controller - play/record/stop etc

export const transportController = () => {

    const record = () => {
        console.log('record')
    }
    const stop = () => {
        console.log('stop')
    }
    const play = () => {
        console.log('play')
    }
    const toggleRepeat = () => {
        console.log('toggleRepeat')
    }

    return {
        record,
        stop,
        play,
        toggleRepeat,
    }
}
