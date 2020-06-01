import withApollo from "@/hoc/withApollo"
import withAuth from "@/hoc/withAuth"

const Users = withAuth(() => {
  return <div>Users page</div>
}, ["admin"])

export default withApollo(Users)
