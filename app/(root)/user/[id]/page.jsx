import { auth } from '@/auth';
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';
import { StartupCardSkeleton } from '@/components/StartupCard';

export const experimental_ppr = true;

const Page = async({params}) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id})

  if(!user) return notFound()
  return (
    <>
      <section className='profile_container'>
        <div className='profile_card'>
          <div className='profile_title'>
            <h3 className='text-24-black uppercase text-center line-clamp-1'>
              {user.name}
              </h3>
          </div>

          <Image src={user.image} alt={user.name}
            width={220}
            height={220}
            className='profile_image'
          />
        <p className='text-30-extrabold mt-7 text-center'>
            @{user?.username}
        </p>
        <p className='mt-1 text-center text-14-normal'>{user?.bio}</p>
      </div>

      <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
        <p className='text-30-bold'>
          {session?.id === id ? "Your" : "All"} Startups
        </p>

      <ul className='card_grid-sm'>
          {/* TODO: ADD USER_STARTUPS 
           -- PRECISA SER DINAMICO AQUI */}
           <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups  id={id} />

           </Suspense>
      </ul>

      </div>

      </section>
    </>
  )
}

export default Page