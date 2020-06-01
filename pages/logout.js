import { useEffect } from "react"
import { useRouter } from "next/router"
import withApollo from "@/hoc/withApollo"
import { useLogout } from "@/apollo/actions"

const Logout = ({ apollo }) => {
  const [logout] = useLogout()
  const router = useRouter()

  useEffect(() => {
    logout().then(() => {
      apollo.resetStore().then(() => router.push("/login"))
    })
  }, [])

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Logging out...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(Logout)
