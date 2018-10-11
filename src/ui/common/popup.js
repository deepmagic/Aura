import React from 'react'

export const Popup = ({children, caret, design, left, right, top, bottom}) => {
    const rect = {
        left,
        right,
        top,
        bottom,
    }

    return (
        <div className={`popup ${design || ''}`} style={rect}>
            <div
                className={`caret ${caret.pos || 'hide'}`}
                style={{ transform: `translate(${caret.x || 0}, ${caret.y || 0}) rotateZ(45deg)`}} />
            {children}
        </div>
    )
}
