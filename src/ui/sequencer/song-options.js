import React from 'react'

export const SongOptions = () => {
    return (
        <div className='song-options'>
            <div className='left'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Tempo
                            </td>
                            <td>
                                <input type='number' value={120.8} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Swing
                            </td>
                            <td>
                                <input type='number' value={0} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='right'>
                <div>
                    Tap
                </div>
                <div>
                    Metronome
                </div>
            </div>
        </div>
    )
}
