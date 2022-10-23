import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Page: NextPage = () => {
  return (
    <div className='bg-gray-50 dark:bg-gray-700 min-h-screen'>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="This page is a minimal signup example page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container mx-auto pt-[100px]'>
        <form action="/api/signup" method="post" className='container mx-auto py-10'>
          <h1 className='mb-2 text-gray-900 dark:text-gray-300 text-3xl'>Sign up</h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
              <input type="text" name='username' min={4} className="focus:outline-none mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input type="email" name='email' min={4} className="focus:outline-none mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
              <input type="password" name='password' min={6} className="focus:outline-none mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
              <input type="password" name='confirm_password' min={6} className="focus:outline-none mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register me</button>

          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">If you already have a account, please <Link href="/login"><a className="font-medium text-blue-600 hover:underline dark:text-blue-500">log in with the existing one</a></Link>.</p>
        </form>
      </main>
    </div>
  )
}

export default Page
