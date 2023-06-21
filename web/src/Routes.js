import { Set, Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

import Standard from './layouts/Standard/Standard'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/form" page={FormPage} name="form" />
      <Route path="/login" page={Login2Page} name="login" />
      <Route path="/ask/{cuid:String}" page={AskPage} name="ask" />
      <Route path="/ask" page={AskPage} name="ask" />
      <Route path="/resources" page={ResourcesPage} name="resources" />
      <Route path="/forgot-password" whileLoadingAuth={() => <>Loading...</>} page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login2" page={LoginPage} name="login2" />
      <Route path="/signup" page={SignupPage} name="signup" />

      <Set wrap={Standard}>
        <Route path="/privacy" page={PrivacyPage} name="privacy" />
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" prerender />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/my-profile" page={MyProfilePage} name="myProfile" />
          {/*<Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              <Route path="/group-roles/{cuid}" page={GroupRoleEditGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>*/}


          <Set>
            {/*<Route path="/list/users" page={AboutPage} name="list" />{/*this is how to override one*/}
            {/*page:int*/}
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/orderBy/{orderBy...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/orderBy/{orderBy...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}" page={ListPage} name="list" />
            {/*take:int*/}
            <Route path="/list/{table}/take/{take:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/take/{take:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/take/{take:Int}" page={ListPage} name="list" />
            {/*orderBy:string*/}
            <Route path="/list/{table}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/orderBy/{orderBy...}" page={ListPage} name="list" />
            {/*where:string*/}
            <Route path="/list/{table}/where/{where...}" page={ListPage} name="list" />
            {/*no params*/}
            <Route path="/list/{table}" page={ListPage} name="list" />
            {/*<Route path="/list/{table}/{params...}" page={ListPage} name="list" />*/}
            {/*<Route path="/list/{table}" page={ListPage} name="list" />*/}

            <Route path="/form/{table}/{cuid}" page={FormPage} name="formEdit" />
            <Route path="/form/{table}" page={FormPage} name="form" />
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
