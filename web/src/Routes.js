import { Set, Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import LogsLayout from 'src/layouts/LogsLayout'
import MemoriesLayout from 'src/layouts/MemoriesLayout'
import MemoryChunksLayout from 'src/layouts/MemoryChunksLayout'
import MessagesLayout from 'src/layouts/MessagesLayout'
import ModelInstancesLayout from 'src/layouts/ModelInstancesLayout'
import PreferencesLayout from 'src/layouts/PreferencesLayout'
import PropertiesLayout from 'src/layouts/PropertiesLayout'
import QuestionsLayout from 'src/layouts/QuestionsLayout'
import ScribeRequestsLayout from 'src/layouts/ScribeRequestsLayout'
import ThreadsLayout from 'src/layouts/ThreadsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

import Standard from './layouts/Standard/Standard'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/form" page={FormPage} name="form" />
      <Route path="/login" page={Login2Page} name="login" />
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
          <Set wrap={MessagesLayout}>
            <Route path="/messages/new" page={MessageNewMessagePage} name="newMessage" />
            <Route path="/messages/{cuid}" page={MessageEditMessagePage} name="editMessage" />
            <Route path="/messages" page={MessageMessagesPage} name="messages" />
          </Set>
          <Set wrap={LogsLayout}>
            <Route path="/logs/new" page={LogNewLogPage} name="newLog" />
            <Route path="/logs/{cuid}" page={LogEditLogPage} name="log" />
            <Route path="/logs" page={LogLogsPage} name="logs" />
          </Set>
          <Set wrap={PropertiesLayout}>
            <Route path="/properties/new" page={PropertyNewPropertyPage} name="newProperty" />
            <Route path="/properties/{cuid}" page={PropertyEditPropertyPage} name="property" />
            <Route path="/properties" page={PropertyPropertiesPage} name="properties" />
          </Set>

          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate', 'groupRead']}>
              <Route path="/groups/{cuid:string}" page={GroupEditGroupPage} name="group" />
              <Route path="/groups" page={GroupGroupsPage} name="groups" />
            </Private>
          </Set>
          <Set wrap={PreferencesLayout}>
            <Private unauthenticated="home">
              <Route path="/preferences/new" page={PreferenceNewPreferencePage} name="newPreference" />
            </Private>
            <Private unauthenticated="home">
              <Route path="/preferences/{cuid}" page={PreferenceEditPreferencePage} name="preference" />
              <Route path="/preferences" page={PreferencePreferencesPage} name="preferences" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate', 'userRead']}>
              <Route path="/users/{cuid}" page={UserEditUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate', 'groupMemberRead']}>
              <Route path="/group-members/{cuid}" page={GroupMemberEditGroupMemberPage} name="groupMember" />
              <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              <Route path="/group-roles/{cuid}" page={GroupRoleEditGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>

          <Set wrap={ModelInstancesLayout} title="ModelInstances" titleTo="modelInstances" buttonLabel="New ModelInstance" buttonTo="newModelInstance">
            <Private unauthenticated="home" role={['admin']}>
              <Route path="/model-instances/new" page={ModelInstanceNewModelInstancePage} name="newModelInstance" />
              <Route path="/model-instances/{cuid}" page={ModelInstanceEditModelInstancePage} name="modelInstance" />
              <Route path="/model-instances" page={ModelInstanceModelInstancesPage} name="modelInstances" />
            </Private>
          </Set>
          <Set wrap={ScribeRequestsLayout} title="ScribeRequests" titleTo="scribeRequests" buttonLabel="New ScribeRequest" buttonTo="newScribeRequest">
            <Private unauthenticated="home" role={['admin']}>
              <Route path="/scribe-requests/new" page={ScribeRequestNewScribeRequestPage} name="newScribeRequest" />
              <Route path="/scribe-requests/{cuid}" page={ScribeRequestEditScribeRequestPage} name="scribeRequest" />
              <Route path="/scribe-requests" page={ScribeRequestScribeRequestsPage} name="scribeRequests" />
            </Private>
          </Set>
          <Set wrap={MemoriesLayout} title="Memories" titleTo="memories" buttonLabel="New Memory" buttonTo="newMemory">
            <Route path="/memories/new" page={MemoryNewMemoryPage} name="newMemory" />
            <Route path="/memories/{cuid}" page={MemoryEditMemoryPage} name="memory" />
            <Route path="/memories" page={MemoryMemoriesPage} name="memories" />
          </Set>
          <Set wrap={MemoryChunksLayout} title="MemoryChunks" titleTo="memoryChunks" buttonLabel="New MemoryChunk" buttonTo="newMemoryChunk">
            <Route path="/memory-chunks/new" page={MemoryChunkNewMemoryChunkPage} name="newMemoryChunk" />
            <Route path="/memory-chunks/{cuid}" page={MemoryChunkEditMemoryChunkPage} name="memoryChunk" />
            <Route path="/memory-chunks" page={MemoryChunkMemoryChunksPage} name="memoryChunks" />
          </Set>
          <Set wrap={ThreadsLayout} title="Threads" titleTo="threads" buttonLabel="New Thread" buttonTo="newThread">
            <Route path="/threads/new" page={ThreadNewThreadPage} name="newThread" />
            <Route path="/threads/{cuid}" page={ThreadEditThreadPage} name="thread" />
            <Route path="/threads" page={ThreadThreadsPage} name="threads" />
          </Set>
          <Set wrap={QuestionsLayout} title="Questions" titleTo="questions" buttonLabel="New Question" buttonTo="newQuestion">
            <Route path="/questions/new" page={QuestionNewQuestionPage} name="newQuestion" />
            <Route path="/questions/{cuid}" page={QuestionEditQuestionPage} name="question" />
            <Route path="/questions" page={QuestionQuestionsPage} name="questions" />
          </Set>

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
