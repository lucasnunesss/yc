import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/lib/queries'
import { formViews } from '@/lib/utils'
import { writeClient } from '@/sanity/lib/write-client'
import { unstable_after as after } from 'next/server'
// Parte dinamica
const View = async({id}) => {
  const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id})

  after(async() => await writeClient.patch(id).set({views: totalViews + 1}).commit())
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
          <Ping />
        </div>

        <p className='view-text'>
            <span className='font-black'>{formViews(totalViews)}</span>
        </p>
    </div>
  )
}

export default View