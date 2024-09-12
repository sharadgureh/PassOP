import React, { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { FaMinus } from "react-icons/fa"
import './Card.css'
function Card(props) {
        const {title,description}=props
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false)
        const classess= 'card-li'

  return (
    
        <li className={`${isOpen} && "open" ${classess} `} onClick={()=> setIsOpen(!isOpen)}>
                <div className="card-div gradient-background-div">
                        <span> {isOpen? <FaMinus/>: <FaPlus/>}</span>
                        <h4>{title}</h4>
                </div>
                {isOpen && <small>{description}</small>}
        </li>
   
  )
}

export default Card