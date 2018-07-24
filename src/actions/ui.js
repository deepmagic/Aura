export const UI_TOGGLE_EXPAND = 'UI_TOGGLE_EXPAND'
export const UI_TOGGLE_SONGPATTERN = 'UI_TOGGLE_SONGPATTERN'
export const UI_TOGGLE_INSTRUMENT_SELECT = 'UI_TOGGLE_INSTRUMENT_SELECT'
export const UI_PATTERN_TOOL = 'UI_PATTERN_TOOL'

export const uiToggleExpand = () => ({
    type: UI_TOGGLE_EXPAND
})
export const uiToggleSongPattern = () => ({
    type: UI_TOGGLE_SONGPATTERN
})
export const uiToggleInstrumentSelect = () => ({
    type: UI_TOGGLE_INSTRUMENT_SELECT
})
export const uiSetPatternTool = (tool) => ({
    type: UI_PATTERN_TOOL,
    tool
})
