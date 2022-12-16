// list the fields in the table I want to pull

let fields = (table) => {
  let returnFields = []
  switch (table) {
    case 'sys_script':
      returnFields = [
        'action_insert',
        'action_update',
        'action_delete',
        'action_query',
        'collection',
        'advanced', // only not set 50 times
        'active',
        'when',
        'order',
        'add_message',
        'script', //only if advanced is true
        'abort_action',
        'filter_condition',
        'condition',
        'name',
      ]
      break
    case 'sys_script_include':
      returnFields = ['name', 'active', 'script']
      break
    case 'sys_ui_script':
      returnFields = ['name', 'active', 'script']
      break
    case 'sys_ui_action':
      returnFields = ['name', 'active', 'script']
      break
    // done
    default:
      return []
  }
  return returnFields
}

export default fields
