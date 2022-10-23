import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import Link from 'next/link'

const Home: NextPage = () => {
  const [user,setUser] = useState<Partial<User>|undefined>({ id: -1 })
  useEffect(() => {
    fetch('/api/user').then((res) => {
      console.log(res.status)
      if (res.status < 300) {
        return res.json().then(setUser)
      }
      setUser(undefined)
    })
  }, [])
  return (
    <div className='bg-gray-50 dark:bg-gray-700 min-h-screen'>
      <Head>
        <title>Tutorial: Basic Authentication</title>
        <meta name="description" content="This is a basic authentication example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container mx-auto text-dark dark:text-white pt-[100px]'>
        <p>This is a minimal authentication example. Please visit the <Link href="/login"><a className='text-blue-500'>login page</a></Link> to login with a existing account or <Link href="/signup"><a className='text-blue-500'>sign up</a></Link> to create a new one. When you login successfully, you will be greated with your username below.</p>
        <p>Notice: global user state is out of scope for this example, so the navigation in the header is not updated.</p>
        <div className='mb-10' />
        {user != undefined && user.id != -1 && <h1>Welcome {user.username}! Your id is {user.id}.</h1>}
        {user == undefined && <h1>You are not logged in!</h1>}
      </main>
    </div>
  )
}

export default Home
