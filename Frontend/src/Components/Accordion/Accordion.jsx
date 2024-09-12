import React from 'react'
import Card from './Card'
import './Accordion.css'
import {data} from './Data'

function Accordion() {
  return (
        <main className='flex flex-col items-center w-full justify-center gap-y-5'>
        <h2 className='text-4xl md:text-8xl font-bold text-center ring-black gradient-text-about'>PassOp Project</h2>
        <h4 className=' text-4xl md:text-lg font-bold text-center ring-black gradient-text-h4'>Your Own Password Manager</h4>
        <p className='text-black'>frequently asked Question</p>
        <menu className='flex items-center'>
          {data.map((item)=> <Card key={item.id} {...item}/>)}
        </menu>
            </main>
  )
}

export default Accordion