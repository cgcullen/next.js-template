import LoginForm from "@/components/forms/LoginForm"
import withApollo from "@/hoc/withApollo"
import { useLogin } from "@/apollo/actions"
import Redirect from "@/components/shared/Redirect"
import Link from "next/link"

const Login = () => {
  const [logIn, { data, loading, error }] = useLogin()

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
            Sign in to your account
          </h2>
          <p className="mt-3 text-center">
            Don't have an account yet?{" "}
            <Link href="/register">
              <a className="text-primary-500">Register</a>
            </Link>
          </p>
        </div>
      </div>
      <LoginForm
        loading={loading}
        onSubmit={(logInData) => logIn({ variables: logInData })}
      />
      {data && data.logIn && <Redirect to="/" />}
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

export default withApollo(Login)
