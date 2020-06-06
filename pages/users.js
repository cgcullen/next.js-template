import withApollo from "@/hoc/withApollo"
import withAuth from "@/hoc/withAuth"
import BaseLayout from "@/layouts/BaseLayout"
import UserList from "@/components/UserList"

const Users = withAuth(
  () => {
    return (
      <BaseLayout>
        <h1 className="text-xl">Users</h1>
        <UserList />
      </BaseLayout>
    )
  },
  ["admin"],
  { ssr: true }
)

export default withApollo(Users)
