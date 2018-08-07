// bars, max 16
// barsize = screenWidth / zoom
// zoom = min 1 - max 8 bars
    // scroll horizontally to view more
// barwidth = pageWidth / zoom
// svgWidth = bars * barwidth

// 33  = note height + border
// 101 = note width + border
export const NOTES = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]
export const OCTAVES = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
export const NOTE_HEIGHT = 33
export const OCTAVE_HEIGHT = NOTES.length * NOTE_HEIGHT
export const NUM_KEYS = OCTAVES.length * NOTES.length
export const MAX_HEIGHT =  NUM_KEYS * NOTE_HEIGHT
export const defaultLoop = {
    bars: 1,
    notes: [
        /*
        { n: 'C',  o: 9, v: 0.9, on: '0:0:0.0', off: '0:0:1.0' },
        { n: 'D#', o: 9, v: 0.9, on: '1:0:0.0', off: '1:0:1.0' },
        { n: 'E',  o: 4, v: 0.9, on: '1:1:0.0', off: '1:1:1.0' },
        { n: 'C',  o: 9, v: 0.9, on: '2:0:0.0', off: '2:0:1.0' },
        { n: 'D#', o: 1, v: 0.5, on: '3:0:0.0', off: '3:0:1.0' },

        { n: 'C',  o: 3, v: 0.9, on: '0:0:0.0',  off: '0:0:1.0' },
        { n: 'E',  o: 3, v: 0.9, on: '0:0:2.0',  off: '0:0:3.0' },
        { n: 'G',  o: 3, v: 0.9, on: '0:0:4.0',  off: '0:0:5.0' },
        { n: 'B',  o: 3, v: 0.9, on: '0:0:6.0',  off: '0:0:7.0' },
        { n: 'C',  o: 4, v: 0.9, on: '0:0:8.0',  off: '0:0:9.0' },
        { n: 'B',  o: 3, v: 0.9, on: '0:0:10.0', off: '0:0:11.0' },
        { n: 'G',  o: 3, v: 0.9, on: '0:0:12.0', off: '0:0:13.0' },
        { n: 'E',  o: 3, v: 0.9, on: '0:0:14.0', off: '0:0:15.0' },
        */
    ]
}
