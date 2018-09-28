import React from 'react'
import { Icon } from 'ui/common/icon'

const SongScenePlayhead = ({percent}) =>
    <div className='playhead' style={{ transform: `translateX(${percent}%)` }} />

const SongSceneHeadOverlay = () =>
    <div className='scene-head-overlay'>
        <div className='quad'>4/4 x 1</div>
        <div className='quad'>Delete</div>
        <div className='quad'>Insert</div>
        <div className='quad'>Duplicate</div>
    </div>

export const SongSceneHead = ({name, active, playTime, onClick, showOverlay}) =>
    <div className='scene-head' onClick={onClick}>
        {
            active &&
            <SongScenePlayhead percent={playTime} />
        }
        <Icon>play_arrow</Icon>
        <div className='name'>{name}</div>
        {
            showOverlay &&
            <SongSceneHeadOverlay />
        }
    </div>
