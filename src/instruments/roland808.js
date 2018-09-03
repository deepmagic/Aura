import { Player } from './player'

export const Roland808 = () => {

    const samples = {
        'C9':  'samples/808/808-Kicks34.wav',
        'C#9': 'samples/808/808-HiHats01.wav',
        'D9':  'samples/808/808-Snare10.wav',
        'D#9': 'samples/808/808-OpenHiHats05.wav',
        'E9':  'samples/808/808-Ride3.wav',
        'F9':  'samples/808/808-Clap17.wav',
        'F#9': 'samples/808/808-HiHats01.wav',
        'G9':  'samples/808/808-Stick1.wav',
        'G#9': 'samples/808/808-Conga1.wav',
        'A9':  'samples/808/808-Tom1.wav',
        'A#9': 'samples/808/808-Tom2.wav',
        'B9':  'samples/808/808-Tom3.wav',
    }

    return Player(samples)
}
