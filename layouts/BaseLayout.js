import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { ToastContainer } from "react-toastify"

const BaseLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-8">
      <header>
        <Nav />
      </header>
      <main className="flex-grow py-8 pb-8 sm:px-6 lg:px-8">{children}</main>
      <Footer>Social links</Footer>
      <ToastContainer />
    </div>
  )
}

export default BaseLayout
