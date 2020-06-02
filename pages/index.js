import Nav from "@/components/Nav"
import withApollo from "@/hoc/withApollo"
import withAuth from "@/hoc/withAuth"

const IndexPage = withAuth(() => {
  return (
    <div>
      <Nav />
      <div className="hero">
        <h1 className="title">Hello World!</h1>
      </div>
    </div>
  )
})

export default withApollo(IndexPage)
