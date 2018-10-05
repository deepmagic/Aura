import React from 'react'

export const Popup = ({children, caret, x, y}) => {
    const caretPos = caret.pos || 'hide'
    const caretX = caret.x || 0
    const caretY = caret.y || 0
    const rect = {
        left: x,
        top: y
    }

    return (
        <div className='popup' style={rect}>
            <div className={`caret ${caretPos}`} style={{ transform: `translate(${caretX}, ${caretY}) rotateZ(45deg)`}} />
            {children}
        </div>
    )
}
