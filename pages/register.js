import { Fragment } from "react"
import RegisterForm from "@/components/forms/RegisterForm"
import Nav from "@/components/Nav"
import { Mutation } from "react-apollo"
import { REGISTER } from "@/apollo/queries"
import withApollo from "@/hoc/withApollo"
import Redirect from "@/components/shared/Redirect"

const Register = () => {
  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Ooooops Something went wrong..."
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Nav />

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
        </div>
      </div>
      <Mutation mutation={REGISTER}>
        {(registerUser, { data, error }) => (
          <Fragment>
            <RegisterForm
              onSubmit={(registerData) => {
                registerUser({ variables: registerData })
              }}
            />
            {data && data.register && <Redirect to="/login" />}
            {error && (
              <div class="w-1/4 mt-4 mb-4 mx-auto rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm leading-5 font-medium text-red-800">
                      {errorMessage(error)}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </Mutation>
    </div>
  )
}

export default withApollo(Register)
