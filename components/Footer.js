const Footer = ({ children }) => {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <div className="px-8 flex justify-between">
      <div>Copyright &copy; {year}</div>
      <div>{children}</div>
      <div className="text-primary-500">
        <a href="https://cullenwebservices.com" target="_blank">
          Cullen Web Services
        </a>
      </div>
    </div>
  )
}

export default Footer
