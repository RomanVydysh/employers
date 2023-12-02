import React from 'react'
import { EmployersListItem } from '../employers-list-item/employers-list-item'
import "./employers-list.css"

export const EmployersList = ({data, onDelete, onToggleIncrease, onToggleRise}) => {
  const element =  data.map(item => {
    let {id, ...itemProps} = item;
    return(
      <EmployersListItem 
      key={id} 
      {...itemProps}
        onDelete={() => onDelete(id)}
        onToggleIncrease={() => onToggleIncrease(id)}
        onToggleRise={() => onToggleRise(id)}

      />
    )
})
  return (
   <ul className='app-list list-group'>
      {element}
   </ul>
  )
}
