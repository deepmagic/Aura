import { PolySynth } from './polysynth'
import { Player } from './player'

const instrumentsMap = {
    '1': Player,
    '2': PolySynth,
}

export const getInstrument = (instid) => {
    return new instrumentsMap[instid]()
}
