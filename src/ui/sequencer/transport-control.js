import React from 'react'
import { Icon } from 'ui/common/icon'

export class TransportControlView extends React.Component {
    componentDidMount () {
        this.props.transportInit()
    }

    record = (flag = true) => {
        const { recording } = this.props.transport
        this.props.transportRecord(!flag || recording ? false : true)
    }

    stop = () => {
        this.props.transportStop()
    }

    playpause = () => {
        const { playing, paused } = this.props.transport
        if (!paused && playing) {
            this.props.transportPause()
        } else {
            this.props.transportPlay()
        }
    }

    render() {
        const { playing, paused, recording } = this.props.transport
        const playClass =
            playing ? 'active' :
            paused  ? 'paused' : ''

        return (
            <div className='transport-control' style={this.props.style}>
                <button className='textbtn function'>
                    Function
                </button>

                <button
                    className={`record ${recording ? 'active' : ''}`}
                    onClick={this.record}>
                    <Icon>fiber_manual_record</Icon>
                </button>

                <button onClick={this.stop}>
                    <Icon>stop</Icon>
                </button>

                <button
                    className={`play ${playClass}`}
                    onClick={this.playpause}>
                    <Icon>play_arrow</Icon>
                </button>

                <button>
                    <Icon>loop</Icon>
                </button>

                <button className='textbtn tempo'>
                    Tempo
                </button>

                <button className='textbtn quantize'>
                    Quantize
                </button>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import {
    transportInit,
    transportPlay,
    transportPause,
    transportStop,
    transportRecord,
} from 'actions/transport'

export const TransportControl = connect(
    (state) => ({
        transport: state.transport,
    }),
    {
        transportInit,
        transportPlay,
        transportPause,
        transportStop,
        transportRecord,
    }
)(TransportControlView)
