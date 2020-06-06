import Link from "next/link"
import { useState, useEffect, Fragment } from "react"
import { useLazyGetUser } from "@/apollo/actions"

export default function Nav() {
  const [user, setUser] = useState(null)
  const [hasResponse, setHasResponse] = useState(false)
  const [getUser, { data, error }] = useLazyGetUser()

  useEffect(() => {
    getUser()
  }, [])

  if (data) {
    if (data.user && !user) {
      setUser(data.user)
    }
    if (!data.user && user) {
      setUser(null)
    }
    if (!hasResponse) {
      setHasResponse(true)
    }
  }
  return (
    <nav className="bg-white border-b-2 border-gray-100">
      <ul className="flex justify-between items-center px-8 py-6">
        <li>
          <Link href="/">
            <a className="text-primary-500 no-underline">Home</a>
          </Link>
        </li>
        {hasResponse && (
          <ul className="flex justify-between items-center space-x-4">
            {user && (
              <Fragment>
                <li>
                  <span className="">Welcome {user.firstname}!</span>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link href="/users">
                      <a>Users</a>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/logout">
                    <a className="btn-primary-500 no-underline">Logout</a>
                  </Link>
                </li>
              </Fragment>
            )}
            {(error || !user) && (
              <Fragment>
                <li>
                  <Link href="/login">
                    <a className="btn-primary-500 no-underline">login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a className="btn-primary-500 no-underline">Register</a>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        )}
      </ul>
    </nav>
  )
}
