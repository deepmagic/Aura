import React from 'react'
import { Icon } from 'ui/common/icon'

const version = '[AIV]{version}[/AIV]'

export class SeqHeader extends React.PureComponent {
    render() {
        const { songpattern, onBack } = this.props;

        return (
            <div className='seq-header'>
                {
                    songpattern
                    ?
                    <div className='button-bar' onClick={onBack}>
                        <Icon>keyboard_arrow_left</Icon>
                        <span>Back</span>
                    </div>
                    :
                    <div className='button-bar'>
                        <Icon>menu</Icon>
                    </div>
                }
                Aura - v{version}
                <div className='button-bar right'>
                    <Icon>swap_vert</Icon>
                    <Icon style={{ fontSize: '1.2em', lineHeight: 1 }}>settings</Icon>
                </div>
            </div>
        )
    }
}
