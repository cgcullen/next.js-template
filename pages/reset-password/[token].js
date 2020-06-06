import { useForm } from "react-hook-form"
import { useResetPassword } from "@/apollo/actions"
import withApollo from "@/hoc/withApollo"
import { useRouter } from "next/router"
import Link from "next/link"

const useInitialData = () => {
  const router = useRouter()
  const { token } = router.query
  console.log("token: " + token)
  return { token }
}

const ResetPassword = (props) => {
  const { token } = useInitialData()
  const [resetPassword, { data, loading, error }] = useResetPassword()

  const { register, handleSubmit } = useForm()
  const onSubmit = (formData) => {
    console.log(formData)
    resetPassword({
      variables: {
        newPassword: formData.newPassword,
        newPasswordConfirmation: formData.newPasswordConfirmation,
        token,
      },
    })
  }

  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Ooooops Something went wrong..."
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="flex flex-col justify-center py-12 pb-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/img/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  ref={register}
                  type="password"
                  name="newPassword"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-primary-500 focus:border-primary-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="newPasswordConfirmation"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                New Password Confirmation
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  ref={register}
                  type="password"
                  name="newPasswordConfirmation"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-primary-500 focus:border-primary-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-blue active:bg-primary-700 transition duration-150 ease-in-out"
                >
                  Reset Password
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      {data && (
        <div className="w-1/4 mt-4 mb-4 mx-auto rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm leading-5 font-medium text-green-800">
                Password has been changed{" "}
                <Link href="/login">
                  <a className="text-primary-500">Login</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="w-1/4 mt-4 mb-4 mx-auto rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm leading-5 font-medium text-red-800">
                {errorMessage(error)}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withApollo(ResetPassword)
