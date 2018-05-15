import React from 'react'
import { Icon } from 'ui/common/icon'

export class Panel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {open: false}
    }

    componentDidMount() {
        if (this.props.open) {
            setTimeout(() => this.setState({open: true}))
        }
    }

    close = (event) => {
        this.setState({open: false})
    }

    render() {
        return (
            <div className={`panel ${this.state.open ? 'open' : ''}`}>
                <div className='close' onClick={this.close}>
                    <Icon>clear</Icon>
                </div>
                {this.props.children}
            </div>
        );
    }
}
