// https://code.jace.pro/scribe-monster-training-cs
var data = []
// setLabel setLabelOf addDecoration getLabelOf removeDecoration
// onLoad
data.push({
  prompt: `Table:Incident
Type:onLoad
Prompt:Rename the phone field to "contact number"
Response:`,
  completion: `function onLoad() {
  g_form.setLabelOf('phone', 'Contact Number');
}
`,
})
data.push({
  prompt: `Table:Change
Type:onLoad
Prompt:Change the Caller\'s field label to Contact
Response:`,
  completion: `function onLoad() {
  g_form.setLabelOf('called_id', 'Contact')
}`,
})
data.push({
  prompt: `Table:Problem
Type:onLoad
Prompt:Modify the field labels to use sentence case
Response:`,
  completion: `function onLoad() {
  g_form.elements.forEach(function(field){
    var label = g_form.getLabelOf(field.fieldName);
    let words = label.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    var titleCasedLabel = words.join(' ');
    g_form.setLabelOf(field.fieldName, titleCasedLabel)
  })
}`,
})
data.push({
  prompt: `Table:Request
Type:onLoad
Prompt:Change Issue label to "Tell us about the problem"
Response:`,
  completion: `function onLoad() {
  g_form.setLabelOf('issue', 'Tell us about the problem')
}`,
})
data.push({
  prompt: `Table:Catalog Task
Type:onLoad
Prompt:show phone icon
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('number', 'icon-phone', 'Phone');
}`,
})
data.push({
  prompt: `Table:User
Type:onLoad
Prompt:add help icon
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-helpr', 'Help');
}`,
})
data.push({
  prompt: `Table:Group
Type:onLoad
Prompt:add error image
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-error', 'Error');
}`,
})
data.push({
  prompt: `Table:Group Member
Type:onLoad
Prompt:add phone decoration
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-phone', 'Phone');
}`,
})
data.push({
  prompt: `Table:Company
Type:onLoad
Prompt:Add a "Help" icon next to each field to provide additional information about the field
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-star', 'preferred member');
}`,
})
data.push({
  prompt: `Table:Location
Type:onLoad
Prompt:Add a "VIP" decoration next to the user field if the user is a VIP
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-star', 'preferred member');
}`,
})
data.push({
  prompt: `Table:Catalog Item
Type:onLoad
Prompt:Add an info icon
Response:`,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-info', 'Caller');
}`,
})
// * * onChange
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Rename the contact number field to "friends number" when "friend" is picked from relation
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'friend') {
    g_form.setLabelOf('contact_number', 'Friends number')
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Change the Caller's field label to Contact when type of call is case
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'case') {
    g_form.setLabelOf('caller_id', 'Contact')
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Change Issue label to "Tell us about the problem" when type is issue
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'issue') {
    g_form.setLabelOf('issue', 'Tell us about the problem')
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:show help icon with text of assignment groups managers name when the group is set
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'groupLookup');
  ga.addParam('sysparm_obj', JSON.stringify({"sys_id":g_form.getValue('group')}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    g_form.addDecoration('caller_id', 'icon-help', serverObj.manager.name);
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:add help icon with text of assignment groups member names when the group is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'groupLookup');
  ga.addParam('sysparm_obj', JSON.stringify({"sys_id":g_form.getValue('group')}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    g_form.addDecoration('caller_id', 'icon-help', serverObj.members.join(', '));
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:add help image with the email address of the assignment group when the group is updated
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'groupLookup');
  ga.addParam('sysparm_obj', JSON.stringify({"sys_id":g_form.getValue('group')}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    g_form.addDecoration('caller_id', 'icon-help', serverObj.email);
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:add info decoration with text of "call 555-5555 for help" if priority is set to 1
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == '1'){
    g_form.addDecoration('caller_id', 'icon-info', "Call 555-5555 for help");
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Add a "VIP" decoration next to the user field if the user is a VIP when the user is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  var caller = g_form.getReference('caller_id', function(reference){
  if(reference.vip == 'true') {
    g_form.addDecoration('user', 'icon-hr', "VIP");
  }
});
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Add an info icon showing the label of the user field if the user is a VIP when the user is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  g_form.addDecoration('user', 'icon-info', "VIP");
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Remove a warning indicator on the agree field is checked
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'true') {
    g_form.removeDecoration('agree', 'icon-warning', "Agree");
  }
}`,
})
//
// ** setDisplay setVisible getRelatedListNames getSectionNames getSections
// * * onLoad
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Hide all the fields except Reason
Response:`,
  completion: `function onLoad() {
    g_form.elements.forEach(function(field){
      if(field.fieldName != 'reason'){
        g_form.setDisplay(field.fieldName, false);
      }
    });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Hide the SLA tab
Response:`,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('sla')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Remove the Game field from the form
Response:`,
  completion: `function onLoad() {
  g_form.setDisplay('game', 'false');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide game
Response:`,
  completion: `function onLoad() {
  g_form.setMandatory('caller_id', false);
  g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:remove game
Response:`,
  completion: `function onLoad() {
  g_form.setDisplay('game', 'false');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide complaints list
Response:`,
  completion: `function onLoad() {
  g_form.setMandatory('caller_id', false);
  g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide game data section
Response:`,
  completion: `function onLoad() {
    g_form.setMandatory('caller_id', false);
    g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `Table:Incident
Type:onLoad
Prompt:hide checklist sections data area
Response:`,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide fields in the game section
Response:`,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide list of games
Response:`,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('games')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide customer information section
Response:`,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[3], false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide customer data area
Response:`,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:remove customer information from view
Response:`,
  completion: `function onLoad() {
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:remove external contacts section
Response:`,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:hide external contacts list
Response:`,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('contacts')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:restrict access to short description
Response:`,
  completion: `function onLoad() {
  g_form.setReadOnly('description');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:limit visibility of certain description
Response:`,
  completion: `function onLoad() {
  g_form.setMandatory('description', false);
  g_form.setVisible('description', false);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:make caller read only
Response:`,
  completion: `function onLoad() {
    g_form.setReadOnly('caller_id', true);
}`,
})
// * * onChange
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Hide all the fields except Reason when type is complaint
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'complaint'){
    g_form.elements.forEach(function(field){
      if(field.fieldName != 'reason'){
        g_form.setDisplay(field.fieldName, false);
      }
    });
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Remove the Game field from the form if type is not "entertainment"
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setDisplay('game', false);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:hide game when not "entertainment
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setVisible('game', false);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:remove game if not "entertainment
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setDisplay('game', false);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show the Assignment Group field when type is not "good job"
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'good job'){
    g_form.setDisplay('assignment_group', true);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Hide the Assignment Group field when type is "good job"
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'good job'){
    g_form.setMandatory('assignment_group', false);
    g_form.setDisplay('assignment_group', false);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show the Reason field if type is complaint
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'complaint') {
    g_form.setDisplay('reason', true);
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Change list of available values for type based on selected category
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'getOptions');
  ga.addParam('sysparm_obj', JSON.stringify({"field":"type"}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    var choices = serverObj.choices;
    if(newValue == 'question'){
      g_form.clearOptions('type');
      choices.forEach(function(choice){
        if(choice.value.indexOf('qa-')>=0){
          g_form.addOption('type', choice.value, choice.label);
        }
        if(choice.value.indexOf('issue-')>=0){
          g_form.addOption('type', choice.value, choice.label);
        }
        if(choice.value.indexOf('report-')>=0){
          g_form.addOption('type', choice.value, choice.label);
        }
      })
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Display a message to user when changing Reason or Type values
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.addInfoMessage('Here is a message because a field changed');
  }
}`,
})
//
//
// ** setValue clearValue
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:fill the field "Address" with the user's current location
Response:`,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('address', userGr.address)
  })
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Set "Hours Worked" to 8
Response:`,
  completion: `function onLoad() {
  g_form.setValue('hours_worked', 8)
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:generate a random string for each form submission
Response:`,
  completion: `function onLoad() {
  var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  var randomString = ''
  for (var i = 0; i < 16; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  g_form.setValue('unique_id', randomString);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:fill the field "Name" with the user's name if it is available in their profile
Response:`,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('name', userGr.name)
  })
}`,
})
data.push({
  prompt: `fill the field "Phone Number" with the user's phone number if it is available in their profile
Response:`,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('phone', userGr.phone)
  })
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Set a default value for the number of days field
Response:`,
  completion: `function onLoad() {
  g_form.setValue('days', 7);
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:fill the field "Country" with the user's current country
Response:`,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('country', userGr.country)
  })
}`,
})

data.push({
  prompt: `Table:Case
Type:onChange
Prompt:clear the value of the field "Assignment Group" if division changes
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.clearValue('assignment_group');
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:set the value of "Assignment Group" based on the reason
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(g_form.getValue('reason') == 'because'){
    g_form.setValue('assignment_group', 'a-team');
  }
  if(g_form.getValue('reason') != 'because'){
    g_form.setValue('assignment_group', 'b-team');
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:clear the value of the field "Type" if reason changes
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.clearValue('type');
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:set the value of "Type" based on the assignment group
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'asdfghjklasdfghjksdfghjk'){
    g_form.setValue('type', 'because');
  } else {
    g_form.setValue('type', 'other');
  }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Set "Name" as required and display an error message if it is left blank
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading) { return; }
  if(newValue == ''){
    g_form.addErrorMessage('Name is blank');
    g_form.setMandatory('name',true)
  }
}`,
})
//
//
// ** addOption removeOption clearOptions
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Only show the option "Office" from the field Badge if logged in users is a manager
Response:`,
  completion: `function onLoad() {
  g_form.removeOption('badge', 'office');
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'userLookup');
  ga.addParam('sysparm_obj', JSON.stringify({"sys_id":g_user.userID}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    if(serverObj.isManager){
      g_form.addOption('badge', 'office', 'Office');
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Add an "Other" option to the field "Department"
Response:`,
  completion: `function onLoad() {
    g_form.addOption('department', 'other', 'Other');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Add an "Other" option to the field "Reason"
Response:`,
  completion: `Table:Case
Type:onLoad
Prompt:function onLoad() {
    g_form.addOption('reason', 'other', 'Other');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Add an "Other" option to the field "Type"
Response:`,
  completion: `function onLoad() {
    g_form.addOption('type', 'other', 'Other');
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Add an "Other" option to the field "category"
Response:`,
  completion: `function onLoad() {
    g_form.addOption('category', 'other', 'Other');
}`,
})

data.push({
  prompt: `Table:Case
Type:onChange
Prompt:When user select a Reasons, provide options for all of them in the Category field
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:When user select a Types, provide options for all of them in the Category field
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:When user select a Assignment Groups, provide options for all of them in the Category field
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Remove the "Office" option from the Access field when user is not a manager
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
}`,
})
//
//
// ** addErrorMessage addInfoMessage clearAllFormMessages clearMessages hideAllFieldMsgs hideRelatedList hideRelatedLists setSectionDisplay showRelatedList showRelatedLists
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Show a message stating if the user is allowed to submit the form
Response:`,
  completion: `function onLoad() {
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Clear the messages
Response:`,
  completion: `function onLoad() {
  g_form.clearMessages();
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Set a dropdown menu with options for the field "Country"
Response:`,
  completion: `function onLoad() {
    var countries = [
      { value: 'usa', label: 'USA' },
      { value: 'mexico', label: 'Mexico'},
      { value: 'canada', label: 'Canada'}
    ]
    countries.forEach(function(country){
      g_form.addOption('country', country.value, country.label);
    })

}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Calculate 3 business days from the server now and present that on the form
Response:`,
  completion: `function onLoad() {
  var ga = new GlideAjax('global.utils');
  ga.addParam('sysparm_name', 'calculateBusinessDaysFromNow');
  ga.addParam('sysparm_obj', JSON.stringify({"days":3}));
  ga.getXML(function(response){
    var responseDocument = response.responseXML.documentElement;
    var answer = responseDocument.getAttribute('answer');
    var serverObj = JSON.parse(answer);
    if(serverObj.date){
      g_form.showInfoMessage('3 Business days from now: ' + new Date(serverObj.date))
    }
  });
}`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Show a message telling the user at least one type of device must be checked
Response:`,
  completion: `function onLoad() {
    g_form.addInfoMessage('At least one device must be checked');
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Display a custom error message if the field "Phone Number" is left empty
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading) { return; }
  if(newValue == ''){
    g_form.addErrorMessage('Phone Number is blank');
  }
}`,
})

data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Display a form message when the field "Reason" is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
}`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Hide a form message if the field "Type" is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show a list of items when the field "Assignment Group" is changed
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Calculate the sum of two cost and tax and present that on the under the price field when cost or tax change
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show a message when the user selects an option from the dropdown menu
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
//
data.push({
  prompt: `Add a character limit of 25 for the field "Address"
Response:`,
  completion: `function onLoad() {}`,
})
data.push({
  prompt: `Set the placeholder text for Phone number
Response:`,
  completion: `function onLoad() {}`,
})
//
//** setMandatatory setReadOnly setVariablesReadOnly
data.push({
  prompt: `Make the name field mandatory
Response:`,
  completion: `function onLoad() {}`,
})
data.push({
  prompt: `Make the name and email field read only
Response:`,
  completion: `function onLoad() {}`,
})
//
// ** disableAttachments enableAttachments
data.push({
  prompt: `disable attachements
Response:`,
  completion: `function onLoad() {}`,
})
data.push({
  prompt: `enaable attachements
Response:`,
  completion: `function onLoad() {}`,
})
//
// ** showFieldMsg showInfoBox hideFieldMsg
data.push({
  prompt: `show an example phone number to put in the phone number field below it
Response:`,
  completion: `function onLoad() {}`,
})
//
//
// */

//onChange

// Write a list of prompts that happen when other fields change

data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Display a custom error message if the field "Voucher" is not valid
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Set the the signed field to the current time when the checkbox "Agree" is checked
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Set the "Status" field to 'Completed' when the checkbox "Approved" is checked
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Display a success message when all required fields are filled in
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show a warning message when the "Credit Limit" field is exceeded
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show a discount message when the "Promo Code" field is entered
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Calculate the total cost of an order based on entered fields
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Hide the reason field if other option is not selected
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onLoad
Prompt:Enable a submit button when all required fields are filled in
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Show a notification when the "Confirmation" field is checked
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})
data.push({
  prompt: `Table:Case
Type:onChange
Prompt:Suggest other products based on selected fields
Response:`,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
  }`,
})

// onSubmit

// Write a list of prompts you get to verify data on a form before submit

data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Check that all required fields have been filled out
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Verify the accuracy of contact information (name, address, email, phone number)
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Confirm that any dates entered are valid
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Ensure any selections made from drop-down menus are appropriate
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Check for typos or other errors in the submitted form data
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Validate any codes entered into the form against a master list
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Require users to select at least one checkbox from a list of options
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Add a rule that won\'t allow users to submit the form if the field "Voucher" is not filled
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Only allow users to submit the form once per day
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Add a rule that won\'t submit the form if the field "Email" is invalid
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Verify that all required documents have been uploaded
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Check that any fields with numerical values are within an acceptable range
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Ensure any URLs entered into the form are valid and secure
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Validate any credit card numbers submitted
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Require users to enter a valid postal code
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Confirm that any uploaded files meet system requirements
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Double check that all entered data is accurate and complete
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Verify that any passwords entered match the minimum requirements
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Make sure no prohibited words or phrases are used in any text fields
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Require users to agree to terms and conditions before submitting the form
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Ensure that any images uploaded have the correct file format and size
Response:`,
  completion: `function onSubmit() {}`,
})
data.push({
  prompt: `Table:Case
Type:onSubmit
Prompt:Confirm that any entered numbers are within the expected range for that field
Response:`,
  completion: `function onSubmit() {}`,
})
console.log(data)
