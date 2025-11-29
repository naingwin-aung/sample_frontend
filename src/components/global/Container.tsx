const Container = ({children, className} : {children: React.ReactNode, className?: string}) => {
  return (
    <section className={`px-4 md:px-8 lg:px-16 xl:px-34 2xl:px-90 3xl:px-102 ${className}`}>
      {children}
    </section>
  )
}

export default Container