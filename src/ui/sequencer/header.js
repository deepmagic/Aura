import React from 'react'
import { Icon } from 'ui/common/icon'

const version = '[AIV]{version}[/AIV]'

export class SeqHeaderView extends React.PureComponent {
    render() {
        const { songpattern, expand, uiToggleExpand, onBack } = this.props
        const expandIcon = expand ? 'unfold_less' : 'unfold_more'

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
                    <Icon onClick={uiToggleExpand}>{expandIcon}</Icon>
                    <Icon style={{ fontSize: '1.2em', lineHeight: 1 }}>settings</Icon>
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { uiToggleExpand } from 'actions/ui'
export const SeqHeader = connect(
    state => ({
        expand: state.ui.expand,
    }),
    { uiToggleExpand }
)(SeqHeaderView)
