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
