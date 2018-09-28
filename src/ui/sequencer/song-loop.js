import React from 'react'
import { NOTES, OCTAVES } from 'ui/sequencer/constants'
import { parseTransportTime } from 'ui/sequencer/utils'
import cssColors from 'styles/colors.scss'
import cssConstants from 'styles/constants.scss'

const LOOP_WIDTH = cssConstants.trackblockwidth
const LOOP_HEIGHT = cssConstants.trackblockheight - cssConstants.loopheaderheight
const NOTE_HEIGHT = 3 // arbitrary

const SongLoopPlayhead = ({percent}) =>
    <div className='playhead' style={{ transform: `translateX(${percent}%)` }}></div>

const SongLoopOverlay = ({bars}) =>
    <div className='loop-overlay'>
        <div className='quad'>{bars} Bar</div>
        <div className='quad warn'>Clear</div>
        <div className='quad'>Mute</div>
        <div className='quad'>Copy</div>
    </div>

export class SongLoop extends React.PureComponent {
    constructor () {
        super()

        this.canvas = document.createElement('canvas')
        this.canvas.width = LOOP_WIDTH
        this.canvas.height = LOOP_HEIGHT
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = cssColors.colormidinote
        this.ctx.strokeStyle = '#ffffff66'
        // this.ctx.lineWidth = 1
    }

    componentWillMount () {
        this.props.loop &&
        this.drawLoop()
    }

    componentDidUpdate (prevProps) {
        this.props.loop &&
        this.props.loop !== prevProps.loop &&
        this.drawLoop()
    }

    drawLoop = () => {
        const { loop: { bars, notes } } = this.props

        this.ctx.clearRect(0, 0, LOOP_WIDTH, LOOP_HEIGHT)

        // vertical line per bar
        const barDelta = LOOP_WIDTH / bars
        for (let i = 1; i < bars; i++) {
            const x = i * barDelta

            this.ctx.beginPath()
            this.ctx.moveTo(x, 0)
            this.ctx.lineTo(x, LOOP_HEIGHT)
            this.ctx.stroke()
        }

        // cyan block per note
        const beatDelta = barDelta / 4
        const sixDelta  = beatDelta / 4
        const octaveDelta = LOOP_HEIGHT / OCTAVES.length
        const noteDelta = octaveDelta / NOTES.length
        for (let i = 0; i < notes.length; i++) {
            const { n, o, on, off } = notes[i]

            // X
            const timeOn = parseTransportTime(on)
            const xOn = timeOn.bar * barDelta +
                        timeOn.n4  * beatDelta +
                        timeOn.n16 * sixDelta

            const timeOff = parseTransportTime(off)
            const xOff = timeOff.bar * barDelta +
                         timeOff.n4  * beatDelta +
                         timeOff.n16 * sixDelta
            // Y
            const noteIndex = NOTES.indexOf(n)
            const octaveIndex = OCTAVES.indexOf(o)
            const y = noteIndex   * noteDelta +
                      octaveIndex * octaveDelta

            this.ctx.fillRect(xOn, y, xOff - xOn, NOTE_HEIGHT)
        }

        this.imageDataUrl = this.canvas.toDataURL()
    }

    render () {
        const {
            loop,
            playTime,
            active,
            transportLoopLength,
            showOverlay,
            ...restProps
        } = this.props

        const relativePlayTime = loop
            ? playTime / (loop.bars / transportLoopLength) % 100
            : playTime

        // console.log('relativePlayTime, playTime', relativePlayTime, playTime)

        return (
            <div className={`loop ${!loop ? 'placeholder' : ''}`} {...restProps}>
                {
                    loop &&
                    <React.Fragment>
                        {active && <SongLoopPlayhead percent={relativePlayTime} />}
                        <img src={this.imageDataUrl} width={LOOP_WIDTH} height={LOOP_HEIGHT} />
                    </React.Fragment>
                }
                {
                    showOverlay &&
                    <SongLoopOverlay bars={loop && loop.bars} />
                }
            </div>
        )
    }
}
