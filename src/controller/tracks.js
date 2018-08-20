import Tone from 'tone'

class Track {
    constructor (instrument) {
        this.meter = new Tone.Meter()
        this.solo = new Tone.Solo()
        this.panVol = new Tone.PanVol()

        instrument.chain(
            this.panVol,
            this.solo,
            this.meter,
            Tone.Master,
        )
    }

    dispose = () => {
        this.meter.dispose()
        this.solo.dispose()
        this.panVol.dispose()
    }
}

export class Tracks {
    constructor() {
        this.tracks = {}
        this.actions = {
            trackMute: this.trackMute,
            trackSolo: this.trackSolo,
            trackSend: this.trackSend,
            trackPan: this.trackPan,
            trackVolume: this.trackVolume,
        }
    }

    add = (trackid, instrument) => {
        this.tracks[trackid] = new Track(instrument)
    }

    del = (trackid) => {
        this.tracks[trackid].dispose()
        delete this.tracks[trackid]
    }

    // flags
    trackMute = (action) => {
        this.tracks[action.trackid].panVol.mute = action.mute
    }

    trackSolo = (action) => {
        this.tracks[action.trackid].solo.solo = action.solo
    }

    // ranges
    trackSend = (action) => {
        // this.tracks[action.trackid].solo.solo = action.solo
    }

    trackPan = (action) => {
        // this.tracks[action.trackid].solo.solo = action.solo
    }

    trackVolume = (action) => {
        // this.tracks[action.trackid].solo.solo = action.solo
    }
}
