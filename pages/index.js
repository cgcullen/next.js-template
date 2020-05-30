import Nav from "@/components/Nav"
import { useHello } from "@/apollo/actions"
import withApollo from "@/hoc/withApollo"
import { getDataFromTree } from "@apollo/react-ssr"

const IndexPage = () => {
  const { data } = useHello(30)

  return (
    <div>
      <Nav />
      <div className="hero">
        <h1 className="title">{data && data.hello}</h1>
      </div>
    </div>
  )
}

export default withApollo(IndexPage, { getDataFromTree })
