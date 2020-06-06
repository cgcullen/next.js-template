import withApollo from "@/hoc/withApollo"
import withAuth from "@/hoc/withAuth"
import BaseLayout from "../layouts/BaseLayout"
import { toast } from "react-toastify"

const IndexPage = withAuth(() => {
  const handleToast = () => {
    toast.success(`You've been Toasted!`)
  }
  return (
    <BaseLayout>
      <h1 className="title">Hello World!</h1>
      <button className="btn btn-primary-500" onClick={handleToast}>
        Toast me
      </button>
    </BaseLayout>
  )
})

export default withApollo(IndexPage)
