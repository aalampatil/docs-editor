interface DocumentsLayoutProps {
  children: React.ReactNode
}
const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return (
    <div className="">
      {/* <nav>document navbar</nav> */}
      {children}
    </div>
  )
}

export default DocumentsLayout