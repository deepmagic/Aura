import React from 'react'

export class SeqPlayControl extends React.Component {
    render() {
        return (
            <div className='play-control'>
                <button>Record</button>
                <button>Stop</button>
                <button>Play</button>
                <button>Repeat</button>
                <span> {this.props.tempo}</span>
            </div>
        )
    }
}
