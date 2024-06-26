import { Fragment } from 'react'

import { useAuth } from 'src/auth'
import CookieModal from 'src/components/CookieModal'
import Footer from 'src/components/Footer'
import SidebarWithHeader from 'src/components/SidebarWithHeader'
import AboutPage from 'src/pages/AboutPage'

const Standard = ({ children /*, isAuthenticated, currentUser*/ }) => {
  const brand = 'ScribeMonster' //TODO: USE PROPERTY OR ENV VARIABLE
  const { isAuthenticated, currentUser } = useAuth()
  let myProps = {
    brand,
    isAuthenticated,
    currentUser,
  }
  return (
    <Fragment>
      <CookieModal />
      {isAuthenticated && (
        <SidebarWithHeader {...myProps}>{children}</SidebarWithHeader>
      )}
      {!isAuthenticated && (
        <Fragment>
          {children}
          <Footer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Standard
