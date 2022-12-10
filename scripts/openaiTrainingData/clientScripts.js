// https://code.jace.pro/scribe-monster-training-cs
var data = []
// setLabel setLabelOf addDecoration getLabelOf removeDecoration
// onLoad
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Rename the phone field to "contact number"
response: `,
  completion: `function onLoad() {
  g_form.setLabelOf('phone', 'Contact Number');
}
`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Change the Caller\'s field label to Contact
response: `,
  completion: `function onLoad() {
  g_form.setLabelOf('called_id', 'Contact')
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Modify the field labels to use sentence case
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Change Issue label to "Tell us about the problem"
response: `,
  completion: `function onLoad() {
  g_form.setLabelOf('issue', 'Tell us about the problem')
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  show phone icon
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('number', 'icon-phone', 'Phone');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  add help icon
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-helpr', 'Help');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  add error image
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-error', 'Error');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  add phone decoration
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-phone', 'Phone');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add a "Help" icon next to each field to provide additional information about the field
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-star', 'preferred member');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add a "VIP" decoration next to the user field if the user is a VIP
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-star', 'preferred member');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add an info icon
response: `,
  completion: `function onLoad() {
  // icons: https://hi.service-now.com/styles/retina_icons/retina_icons.html
  g_form.addDecoration('caller_id', 'icon-info', 'Caller');
}`,
})
// * * onChange
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Rename the contact number field to "friends number" when "friend" is picked from relation
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'friend') {
    g_form.setLabelOf('contact_number', 'Friends number')
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Change the Caller's field label to Contact when type of call is case
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'case') {
    g_form.setLabelOf('caller_id', 'Contact')
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Change Issue label to "Tell us about the problem" when type is issue
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'issue') {
    g_form.setLabelOf('issue', 'Tell us about the problem')
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  show help icon with text of assignment groups managers name when the group is set
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  add help icon with text of assignment groups member names when the group is changed
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  add help image with the email address of the assignment group when the group is updated
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  add info decoration with text of "call 555-5555 for help" if priority is set to 1
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == '1'){
    g_form.addDecoration('caller_id', 'icon-info', "Call 555-5555 for help");
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Add a "VIP" decoration next to the user field if the user is a VIP when the user is changed
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  Add an info icon showing the label of the user field if the user is a VIP when the user is changed
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  g_form.addDecoration('user', 'icon-info', "VIP");
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Remove a warning indicator on the agree field is checked
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Hide all the fields except Reason
response: `,
  completion: `function onLoad() {
    g_form.elements.forEach(function(field){
      if(field.fieldName != 'reason'){
        g_form.setDisplay(field.fieldName, false);
      }
    });
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Hide the SLA tab
response: `,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('sla')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Remove the Game field from the form
response: `,
  completion: `function onLoad() {
  g_form.setDisplay('game', 'false');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide game
response: `,
  completion: `function onLoad() {
  g_form.setMandatory('caller_id', false);
  g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  remove game
response: `,
  completion: `function onLoad() {
  g_form.setDisplay('game', 'false');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide complaints list
response: `,
  completion: `function onLoad() {
  g_form.setMandatory('caller_id', false);
  g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide game data section
response: `,
  completion: `function onLoad() {
    g_form.setMandatory('caller_id', false);
    g_form.setVisible('caller_id', 'false');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide checklist sections data area
response: `,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide fields in the game section
response: `,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide list of games
response: `,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('games')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide customer information section
response: `,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[3], false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide customer data area
response: `,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  remove customer information from view
response: `,
  completion: `function onLoad() {
    g_form.setDisplay('customer_information', false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  remove external contacts section
response: `,
  completion: `function onLoad() {
  var sections = g_form.getSections();
  g_form.setSectionDisplay(sections[1], false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  hide external contacts list
response: `,
  completion: `function onLoad() {
  g_form.getRelatedListNames().forEach(function(list){
    if(list.indexOf('contacts')>=0){
      g_form.hideRelatedList(list);
    }
  });
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  restrict access to short description
response: `,
  completion: `function onLoad() {
  g_form.setReadOnly('description');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  limit visibility of certain description
response: `,
  completion: `function onLoad() {
  g_form.setMandatory('description', false);
  g_form.setVisible('description', false);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  make caller read only
response: `,
  completion: `function onLoad() {
    g_form.setReadOnly('caller_id', true);
}`,
})
// * * onChange
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Hide all the fields except Reason when type is complaint
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  Remove the Game field from the form if type is not "entertainment"
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setDisplay('game', false);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  hide game when not "entertainment
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setVisible('game', false);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  remove game if not "entertainment
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'entertainment'){
    g_form.setMandatory('game', false);
    g_form.setDisplay('game', false);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show the Assignment Group field when type is not "good job"
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != 'good job'){
    g_form.setDisplay('assignment_group', true);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Hide the Assignment Group field when type is "good job"
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'good job'){
    g_form.setMandatory('assignment_group', false);
    g_form.setDisplay('assignment_group', false);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show the Reason field if type is complaint
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue == 'complaint') {
    g_form.setDisplay('reason', true);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Change list of available values for type based on selected category
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  Display a message to user when changing Reason or Type values
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  fill the field "Address" with the user's current location
response: `,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('address', userGr.address)
  })
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Set "Hours Worked" to 8
response: `,
  completion: `function onLoad() {
  g_form.setValue('hours_worked', 8)
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  generate a random string for each form submission
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  fill the field "Name" with the user's name if it is available in their profile
response: `,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('name', userGr.name)
  })
}`,
})
data.push({
  prompt: `fill the field "Phone Number" with the user's phone number if it is available in their profile
response: `,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('phone', userGr.phone)
  })
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Set a default value for the number of days field
response: `,
  completion: `function onLoad() {
  g_form.setValue('days', 7);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  fill the field "Country" with the user's current country
response: `,
  completion: `function onLoad() {
  g_form.getReference('user',function(userGr){
    g_form.setValue('country', userGr.country)
  })
}`,
})

data.push({
  prompt: `action: complete
type:  onChange
prompt:  clear the value of the field "Assignment Group" if division changes
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.clearValue('assignment_group');
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  set the value of "Assignment Group" based on the reason
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  clear the value of the field "Type" if reason changes
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.clearValue('type');
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  set the value of "Type" based on the assignment group
response: `,
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
  prompt: `action: complete
type:  onChange
prompt:  Set "Name" as required and display an error message if it is left blank
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Only show the option "Office" from the field Badge if logged in users is a manager
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Add an "Other" option to the field "Department"
response: `,
  completion: `function onLoad() {
    g_form.addOption('department', 'other', 'Other');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add an "Other" option to the field "Reason"
response: `,
  completion: `action: complete
type:  onLoad
prompt:  function onLoad() {
    g_form.addOption('reason', 'other', 'Other');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add an "Other" option to the field "Type"
response: `,
  completion: `function onLoad() {
    g_form.addOption('type', 'other', 'Other');
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add an "Other" option to the field "category"
response: `,
  completion: `function onLoad() {
    g_form.addOption('category', 'other', 'Other');
}`,
})
//
//
// ** addErrorMessage addInfoMessage clearAllFormMessages clearMessages hideAllFieldMsgs hideRelatedList hideRelatedLists setSectionDisplay showRelatedList showRelatedLists
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Show a message stating if the user is allowed to submit the form
response: `,
  completion: `function onLoad() {
    var ga = new GlideAjax('global.utils');
    ga.addParam('sysparm_name', 'canUserSubmitForm');
    ga.addParam('sysparm_obj', JSON.stringify({"form":"Case"}));
    ga.getXML(function(response){
      var responseDocument = response.responseXML.documentElement;
      var answer = responseDocument.getAttribute('answer');
      var serverObj = JSON.parse(answer);
      if(serverObj.canSubmit){
        g_form.showInfoMessage('Only one of these can be submitted at a time.')
      }
      if(serverObj.canSubmit){
        g_form.showErrorMessage("You've already submitted one of these items, " + serverObj.itemNumber + ".  If you have questions follow up with your Business Analyst.");
      }
    });
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Clear the messages
response: `,
  completion: `function onLoad() {
  g_form.clearMessages();
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Set a dropdown menu with options for the field "Country"
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Calculate 3 business days from the server now and present that on the form
response: `,
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
  prompt: `action: complete
type:  onLoad
prompt:  Show a message telling the user at least one type of device must be checked
response: `,
  completion: `function onLoad() {
    g_form.addInfoMessage('At least one device must be checked');
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Display a custom error message if the field "Phone Number" is left empty
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading) { return; }
  if(newValue == ''){
    g_form.addErrorMessage('Phone Number is blank');
  }
}`,
})

data.push({
  prompt: `action: complete
type:  onChange
prompt:  Display a form message when the field "Reason" is changed
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if(isLoading || newValue === '') { return; }
  if(newValue != oldValue) {
    g_form.clearAllFormMessages();
    g_form.addInfoMessage('Reason has changed to ' + newValue);
  }
}`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Hide a form message if the field "Type" is changed
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue != oldValue) {
      g_form.clearAllFormMessages();
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show a list of items when the field "Assignment Group" is changed
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    var items = ['apples', 'bananas', 'cars'];
    g_form.addInfoMessage('Assignment Group changed, here is a list of items ' + items.join(', ') + '.');
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Calculate the sum of two cost and tax and present that on the under the price field when cost or tax change
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading) { return; }
    var tax = parseFloat(g_form.getValue('tax'),10) || 0;
    var cost = parseFloat(newValue,10) || 0;
    g_form.showFieldMsg('tax', 'Total: ' + (tax + cost), 'info');
  }`,
})
//
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Add a character limit of 25 for the field "Address"
response: `,
  completion: `function onLoad() {
  var control = g_form.getControl('address');
  control.onkeyup = isMaxLength;
}
function isMaxLength() {
  g_form.clearFieldMsg('address', true);
  var maxLength = 25;
  var element = g_form.getControl('address');
  if(element.value.length > maxLength){
    g_form.showFieldMsg('address', 'Only 25 characters allowed, trimed that for you', 'Error');
    element.value = element.value.substring(0, maxLength);
  }
}
`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Set the placeholder text for Phone number
response: `,
  completion: `function onLoad() {
    g_form.setFieldPlaceholder('phone_number','555-5555');
}`,
})
//
//** setMandatatory setReadOnly setVariablesReadOnly
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Make the name field mandatory
response: `,
  completion: `function onLoad() {
  g_form.setMandatory('name',true);
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Make the name and email field read only
response: `,
  completion: `function onLoad() {
  g_form.setReadOnly('name',true);
  g_form.setReadOnly('email',true);
}`,
})
//
// ** disableAttachments enableAttachments
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  disable attachements
response: `,
  completion: `function onLoad() {
  g_form.disableAttachments();
}`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  enaable attachements
response: `,
  completion: `function onLoad() {
  g_form.enableAttachments();
}`,
})
//
// ** showFieldMsg showInfoBox hideFieldMsg
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  show an example phone number to put in the phone number field below it
response: `,
  completion: `function onLoad() {
  g_form.showFieldMsg('phone', 'Example: 555-555-5555','info');
}`,
})
//
//
// */

//onChange

// Write a list of prompts that happen when other fields change

data.push({
  prompt: `action: complete
type:  onChange
prompt:  Display a custom error message if the field "Voucher" is not valid
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue != 'valid'){
      g_form.clearMessages();
      g_form.addErrorMessage('Voucher not valid');
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Set the the signed field to the current time when the checkbox "Agree" is checked
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue != oldValue) {
      g_form.setValue('signed', new Date().toString();)
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Set the "Status" field to 'Completed' when the checkbox "Approved" is checked
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue == 'true') {
      g_form.setValue('status', '7');//completed
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Display a success message when all required fields are filled in
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    var allFieldsFilledOut = true;
    var requiredFields = ['user', 'type', 'category', 'comment'];
    requiredFields.forEach(function(field){
      if(!g_form.getValue(field)){
        allFieldsFilledOut = false;
      }
    })
    if(allFieldsFilledOut){
      g_form.addInfoMessage('You did it!  Form ready to submit!');
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show a warning message when the "Credit Limit" field is exceeded
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue > 1000){
      g_form.hideFieldMsg('credit_limit', true);
      g_form.showFieldMsg('credit_limit', 'Credit limit exceeded', 'error');
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show a discount message when the "Promo Code" field is entered
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    g_form.hideFieldMsg('promo_code', true);
    g_form.showFieldMsg('promo_code', 'Promo Code Entered', 'info');
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Hide the reason field if other option is not selected
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(newValue != 'other'){
      g_form.setMandatory('reason', false);
      g_form.setDisplay('reason', false);
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onLoad
prompt:  Enable a submit button when all required fields are filled in
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    if(!g_form.getValue('all_required_fields')){
      g_form.addErrorMessage('Required fields not filled in');
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Show a notification when the "Confirmation" field is checked
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    g_form.hideFieldMsg('confirmation', true);
    g_form.showFieldMsg('confirmation', 'Confirmed!', 'info');
  }`,
})
data.push({
  prompt: `action: complete
type:  onChange
prompt:  Suggest other products based on selected fields
response: `,
  completion: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if(isLoading || newValue === '') { return; }
    g_form.showFieldMsg('product', 'You may also like to order an iPhone', 'info');
  }`,
})

// onSubmit

// Write a list of prompts you get to verify data on a form before submit
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Verify the accuracy of contact information (name, address, email, phone number)
response: `,
  completion: `function onSubmit() {
    var name = g_form.getValue('name');
    var address = g_form.getValue('name');
    var email = g_form.getValue('email');
    var phone = g_form.getValue('phone');
    var nameValid = name != '';
    var addressValid = address != '';
    var emailValid = email.indexOf('@')>0;
    var phoneValid = (function(){
      var phoneNumber = phone.replace(/\D/g,'');
      return phoneNumber.length == 10;
    })()
    if(nameValid && addressValid && emailValid && phoneValid){
    } else {
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Confirm that any dates entered are valid
response: `,
  completion: `function onSubmit() {
    var dateNumber = getDateFromFormat(g_form.getValue('date'), g_user_date_format);
    if(dateNumber.toString() == 'Invalid Date'){
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Require users to select at least one checkbox from a list of options
response: `,
  completion: `function onSubmit() {
    var checkbox1 = g_form.getValue('checkbox1') == 'true';
    var checkbox2 = g_form.getValue('checkbox2') == 'true';
    var checkbox3 = g_form.getValue('checkbox3') == 'true';
    if(checkbox1 || checkbox2 || checkbox3){
      return true;
    } else {
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Add a rule that won't allow users to submit the form if the field "Voucher" is not filled
response: `,
  completion: `function onSubmit() {
    return g_form.getValue('voucher') != '';
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Add a rule that won't submit the form if the field "Email" is invalid
response: `,
  completion: `function onSubmit() {
    return g_form.getValue('email').indexOf('@')>0;
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Ensure any URLs entered into the form are valid and secure
response: `,
  completion: `function onSubmit() {
    return g_form.getValue('url').indexOf('https://')>=0;
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Validate any credit card numbers submitted
response: `,
  completion: `function onSubmit() {
    return g_form.getValue('credit_card').replace(/\D/g,'').length == 12;
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Require users to enter a valid postal code
response: `,
  completion: `function onSubmit() {
    return parseInt(g_form.getValue('postal_code'),10).length == 5;
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Verify that any passwords entered match the minimum requirements
response: `,
  completion: `function onSubmit() {
    var password = g_form.getValue('password');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var longEnough = password.length > 8;
    var hasLower = password.match(lowerCaseLetters);
    var hasUpper = password.match(upperCaseLetters);
    var hasNumbers = password.match(numbers);
    var hasSpecial = password.match(specialChar);
    if (longEnough && hasLower && hasUpper &&  hasNumbers && hasSpecial) {
      return true;
    } else {
      g_form.addErrorMessage('Password needs to be 9 characters, have lower, upper, number and special characters');
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Make sure no prohibited words or phrases are used in any text fields
response: `,
  completion: `function onSubmit() {
    var hasHate = g_form.getValue('comment').indexOf('hate');
    if (hasHate){
      return false;
    }
  }`,
})
data.push({
  prompt: `action: complete
type:  onSubmit
prompt:  Require users to agree to terms and conditions before submitting the form
response: `,
  completion: `function onSubmit() {
    return g_form.getValue('agree') != 'true';
  }`,
})
console.table(data)
