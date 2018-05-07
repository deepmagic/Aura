import React from 'react'
import { Icon } from 'ui/common/icon'

const version = '[AIV]{version}[/AIV]'

export class SeqHeader extends React.Component {
    render() {

        return (
            <div className='seq-header'>
                Aura - v{version}
                <Icon style={{transform: 'rotate(90deg)', float: 'right'}}>settings_ethernet</Icon>
            </div>
        )
    }
}
