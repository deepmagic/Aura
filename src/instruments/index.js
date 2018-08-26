import { AMSynth } from './amsynth'
import { FMSynth } from './fmsynth'
import { Player } from './player'
import { PolySynth } from './polysynth'

const instrumentsMap = {
    '1': Player,
    '2': PolySynth,
    '3': Player,
    '4': FMSynth,
    '5': AMSynth,
}

export const getInstrument = (instid) =>
    new instrumentsMap[instid]()
