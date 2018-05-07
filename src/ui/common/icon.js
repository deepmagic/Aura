import React from 'react'

export const Icon = ({children, ...props}) => {
    return <i className='material-icons' {...props}>{children}</i>
}
