import { useForm } from "react-hook-form"
import Link from "next/link"

const LoginForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit } = useForm()

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                name="email"
                ref={register}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-primary-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                name="password"
                ref={register}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-primary-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="text-sm leading-5">
              <Link href="/forgot-password">
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
          {loading && "Logging in..."}
          {!loading && (
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-blue active:bg-primary-700 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
