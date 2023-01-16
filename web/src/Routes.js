// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import LogsLayout from 'src/layouts/LogsLayout'
import MessagesLayout from 'src/layouts/MessagesLayout'
import ModelInstancesLayout from 'src/layouts/ModelInstancesLayout'
import PreferencesLayout from 'src/layouts/PreferencesLayout'
import PropertiesLayout from 'src/layouts/PropertiesLayout'
import ScribeRequestsLayout from 'src/layouts/ScribeRequestsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

import Standard from './layouts/Standard/Standard'

const Routes = () => {
  return (
    <Router>
      <Route path="/resources" page={ResourcesPage} name="resources" />
      <Route path="/forgot-password" whileLoadingAuth={() => <>Loading...</>} page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />

      <Set wrap={Standard}>
        <Route path="/privacy" page={PrivacyPage} name="privacy" />
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" prerender />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/my-profile" page={MyProfilePage} name="myProfile" />
          <Set wrap={MessagesLayout}>
            <Route path="/messages/new" page={MessageNewMessagePage} name="newMessage" />
            <Route path="/messages/{id:Int}" page={MessageEditMessagePage} name="editMessage" />
            <Route path="/messages" page={MessageMessagesPage} name="messages" />
          </Set>
          <Set wrap={LogsLayout}>
            <Route path="/logs/new" page={LogNewLogPage} name="newLog" />
            <Route path="/logs/{id}/edit" page={LogEditLogPage} name="editLog" />
            <Route path="/logs/{id}" page={LogEditLogPage} name="log" />
            <Route path="/logs" page={LogLogsPage} name="logs" />
          </Set>
          <Set wrap={PropertiesLayout}>
            <Route path="/properties/new" page={PropertyNewPropertyPage} name="newProperty" />
            <Route path="/properties/{id:Int}/edit" page={PropertyEditPropertyPage} name="editProperty" />
            <Route path="/properties/{id:Int}" page={PropertyEditPropertyPage} name="property" />
            <Route path="/properties" page={PropertyPropertiesPage} name="properties" />
          </Set>

          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate', 'groupRead']}>
              <Route path="/groups/{id:Int}" page={GroupEditGroupPage} name="group" />
              <Route path="/groups" page={GroupGroupsPage} name="groups" />
            </Private>
          </Set>
          <Set wrap={PreferencesLayout}>
            <Private unauthenticated="home">
              <Route path="/preferences/new" page={PreferenceNewPreferencePage} name="newPreference" />
            </Private>
            <Private unauthenticated="home">
              <Route path="/preferences/{id:Int}" page={PreferenceEditPreferencePage} name="preference" />
              <Route path="/preferences" page={PreferencePreferencesPage} name="preferences" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate', 'userRead']}>
              <Route path="/users/{id:Int}" page={UserEditUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate', 'groupMemberRead']}>
              <Route path="/group-members/{id:Int}" page={GroupMemberEditGroupMemberPage} name="groupMember" />
              <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              <Route path="/group-roles/{id:Int}" page={GroupRoleEditGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>

          <Set wrap={ModelInstancesLayout} title="ModelInstances" titleTo="modelInstances" buttonLabel="New ModelInstance" buttonTo="newModelInstance">
            <Private unauthenticated="home" role={['admin']}>
              <Route path="/model-instances/new" page={ModelInstanceNewModelInstancePage} name="newModelInstance" />
              <Route path="/model-instances/{id}" page={ModelInstanceEditModelInstancePage} name="modelInstance" />
              <Route path="/model-instances" page={ModelInstanceModelInstancesPage} name="modelInstances" />
            </Private>
          </Set>
          <Set wrap={ScribeRequestsLayout} title="ScribeRequests" titleTo="scribeRequests" buttonLabel="New ScribeRequest" buttonTo="newScribeRequest">
            <Private unauthenticated="home" role={['admin']}>
              <Route path="/scribe-requests/new" page={ScribeRequestNewScribeRequestPage} name="newScribeRequest" />
              {/*<Route path="/scribe-requests/{id}/edit" page={ScribeRequestEditScribeRequestPage} name="editScribeRequest" />*/}
              <Route path="/scribe-requests/{id}" page={ScribeRequestEditScribeRequestPage} name="scribeRequest" />
              <Route path="/scribe-requests" page={ScribeRequestScribeRequestsPage} name="scribeRequests" />
            </Private>
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
