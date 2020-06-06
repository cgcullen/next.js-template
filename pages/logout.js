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

  return null
}

export default withApollo(Logout)
