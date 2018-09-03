import { AMSynth } from './amsynth'
import { FMSynth } from './fmsynth'
import { Linndrum } from './linndrum'
import { Roland808 } from './roland808'
import { PolySynth } from './polysynth'

const instrumentsMap = {
    '1': Linndrum,
    '2': PolySynth,
    '3': Roland808,
    '4': FMSynth,
    '5': AMSynth,
}

export const getInstrument = (instid) =>
    new instrumentsMap[instid]()
