import React from 'react'

const barButtons = ['-', '+', 1, 2, 4, 8, 16]
const gridButtons = ['Off', '1/2', '1/4', '1/8', '1/16', '1/32', 'Triplet']

const ButtonBar = ({ type, buttons, onClick }) =>
    <div className={`button-bar ${type}`}>
        {
            buttons.map(btn =>
                <div
                    key={btn}
                    className={`${type} bar-button`}
                    onClick={() => onClick(btn)}>
                    {btn}
                </div>)
        }
    </div>

export class LoopOptions extends React.Component{
    setBar = (bars) => {
        const { loop } = this.props

        console.log('setBar', loop.loopid, bars)
    }

    setGrid = (bars) => {
        const { loop } = this.props

        console.log('setGrid', loop.loopid, bars)
    }

    render () {
        const { loop } = this.props

        return (
            <div className='loop-options'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Bars <div className='bar-current'>{loop.bars} Bar</div>
                            </td>
                            <td>
                                <ButtonBar
                                    type='bar' 
                                    buttons={barButtons}
                                    onClick={this.setBar} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Play Mode
                            </td>
                            <td>
                                <div className='play-mode'>
                                    <div className='button active'>Loop</div>
                                    <div className='button'>1-Shot</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Mute
                            </td>
                            <td>
                                <div className='button'>Mute</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Grid
                            </td>
                            <td>
                                <ButtonBar
                                    type='grid'
                                    buttons={gridButtons}
                                    onClick={this.setGrid} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
