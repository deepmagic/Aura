import Tone from 'tone'

export const transportController = () => {

    const record = () => {
        console.log('record')
    }
    const stop = () => {
        Tone.Transport.stop()
    }
    const play = () => {
        Tone.Transport.start()
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

function loopCallback(time){
	console.log("loop");
}
var loop = new Tone.Loop(loopCallback, 2);
loop.start(0)
