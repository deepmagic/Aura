import React from 'react'

const instruments = [
    {name: 'drum'},
    {name: 'am'},
    {name: 'fm'},
    {name: 'metal'},

    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},

    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},

    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
    {name: 'dummy'},
]

const InstView = ({name, ...props}) =>
    <div className='instrument' {...props}>
        {name}
    </div>

export const InstrumentSelector = ({select, ...props}) =>
    <div className='instruments-selector dragscroll' {...props}>
        {
            instruments.map((inst, index) =>
                <InstView
                    key={index}
                    onClick={select.bind(null, inst)}
                    {...inst} />)
        }
    </div>
