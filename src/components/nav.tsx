import Link from 'next/link'

function Navigation() {
  return <nav className="bg-gray-300 px-2 sm:px-4 py-2.5 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600 fixed top-0 left-0 w-full z-10">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
    <Link href="/">
      <a className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Auth Tutorial</a>
    </Link>
    <div className="justify-between items-center flex order-1" id="navbar-sticky">
      <ul className="flex rounded-lg flex-row space-x-8 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link href="/login">
          <a className="block py-2 px-3 rounded text-black dark:text-white dark:bg-gray-700">Login</a>
          </Link>
        </li>
      </ul>
    </div>
    </div>
  </nav>  
}

export default Navigation
