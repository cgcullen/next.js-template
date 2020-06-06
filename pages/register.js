import RegisterForm from "@/components/forms/RegisterForm"
import { useRegister } from "@/apollo/actions"
import withApollo from "@/hoc/withApollo"
import Redirect from "@/components/shared/Redirect"
import Link from "next/link"

const Register = () => {
  const [registerUser, { data, loading, error }] = useRegister()
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
            Sign up for an account
          </h2>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-primary-500">Login</a>
            </Link>
          </p>
        </div>
      </div>
      <RegisterForm
        onSubmit={(registerData) => {
          registerUser({ variables: registerData })
        }}
      ></RegisterForm>
      {data && data.register && <Redirect to="/login" />}
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
export default withApollo(Register)
