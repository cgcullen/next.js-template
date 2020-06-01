import { useForm } from "react-hook-form"

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm()

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                ref={register}
                type="text"
                name="firstname"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                ref={register}
                type="text"
                name="lastname"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                ref={register}
                type="email"
                name="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                ref={register}
                type="password"
                name="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                ref={register}
                type="password"
                name="passwordConfirmation"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
