import React from 'react'
import { Icon } from 'ui/common/icon'

const PatternControlView = ({ patternTool, uiSetPatternTool }) =>
    <div className='pattern-control'>
        <div
            className={`draw ${patternTool === 'draw' ? 'active' : ''}`}
            onClick={() => uiSetPatternTool('draw')}>
            <Icon>create</Icon>
            Draw
        </div>
        <div
            className={`select ${patternTool === 'select' ? 'active' : ''}`}
            onClick={() => uiSetPatternTool('select')}>
            <Icon>select_all</Icon>
            Select
        </div>
    </div>

import { connect } from 'react-redux'
import { uiSetPatternTool } from 'actions/ui'
export const PatternControl = connect(
    (state) => ({
        patternTool: state.ui.patternTool
    }),
    {
        uiSetPatternTool
    }
)(PatternControlView)
