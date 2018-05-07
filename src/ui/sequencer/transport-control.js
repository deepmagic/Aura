import React from 'react'
import { Icon } from 'ui/common/icon'
import { transportController } from 'controller/transport-controller'

export class TransportControl extends React.Component {
    constructor() {
        super()
        this.controller = transportController()
    }

    render() {
        return (
            <div className='transport-control'>
                <button className='textbtn function'>
                    Function
                </button>

                <button onClick={this.controller.record}>
                    <Icon>radio_button_unchecked</Icon>
                </button>

                <button onClick={this.controller.stop}>
                    <Icon>check_box_outline_blank</Icon>
                </button>

                <button onClick={this.controller.play}>
                    <Icon>play_circle_outline</Icon>
                </button>

                <button onClick={this.controller.toggleRepeat}>
                    <Icon>refresh</Icon>
                </button>

                <button className='textbtn tempo'>
                    Tempo
                </button>
            </div>
        )
    }
}
