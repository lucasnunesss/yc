import { STARTUPS_BY_AUTHOR_QUERY } from '@/lib/queries'
import { client } from '@/sanity/lib/client'
import React from 'react'
import StartupCard from './StartupCard'

const UserStartups = async({id}) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
  return (
    <>

      {startups.length > 0 ? startups.map((startup) => (
        <StartupCard key={startup._id} post={startup} />
      )) : (
        <p className='no-result'>No posts yet</p>
      )}
    </>
  )
}

export default UserStartups