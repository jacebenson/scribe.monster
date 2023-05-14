export const definitions = {
  /**
   * Options
   * label
   * readOnly
   * required
   * minLength
   * onChange
   * defaultValue
   * defaultOptions (for simple lists) array of strings or objects with label and value
   *
   */
  User: {
    username: {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    name: {
      label: 'Name',
      canSort: true,
    },
  },
  Preference: {
    entity: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    User: {
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
    },
  },
  Property: {
    name: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    type: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    //'cuid': {
    //  label: 'Cuid',
    //  fontFamily: 'mono',
    //  canSort: true,
    //  canFilter: true,
    //  canShowMatching: true,
    //},
  },
  Message: {
    language: {
      label: 'Language',
    },
    entity: {
      label: 'Entity',
    },
    value: {
      label: 'Value',
    },
  },
  Group: {
    name: {
      label: 'Name',
      minLength: 3,
    },
    description: {
      label: 'Description',
    },
  },
  GroupRole: {
    createdAt: {
      label: 'Created At',
    },
    role: {
      label: 'Role',
      type: 'select',
      //options: [//this also works
      //  'admin','user','guest'
      //]
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ],
      value: 'cuid',
    },
    Group: {
      label: 'Group',
      display: 'name',
      value: 'cuid',
      //type: 'reference2',
      // lets think about this
      // this will need the fields to query
      // this will need the table
      // this will need filter skip and take
      // this will need the default value
      // this will need the default display
      graphql: {
        table: 'group',
        fields: ['name', 'cuid'],
        filter: {},
        skip: 0,
        take: 10,
        defaultDisplay: 'name',
        defaultValue: 'cuid',
      },
    },
  },
  GroupMember: {
    User: {
      label: 'User',
      field: 'userCuid',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 100,
      type: 'reference',
    },

    Group: {
      label: 'Group',
      field: 'groupCuid',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      table: 'group',
      type: 'reference',
      order: 200,
    },
  },
  Log: {
    createdAt: { label: 'Created At' },
    updatedAt: { label: 'Updated At' },
    message: { label: 'Message' },
    source: { label: 'Source' },
  },
  Activity: {
    createdAt: { label: 'Created At' },
    updatedAt: { label: 'Updated At' },
    User: { label: 'User', display: 'name', value: 'cuid' },
  },
  Memory: {
    title: { label: 'Title', order: 100 },
    source: { label: 'Source', order: 200 },
    active: {
      label: 'Active',
      type: 'select',
      options: [
        { value: true, display: 'Active' },
        { value: false, display: 'Inactive' },
      ],
      order: 300,
    },
    content: { label: 'Content', type: 'textarea', order: 400 },
  },
  MemoryChunk: {
    title: { label: 'Title' },
    active: { label: 'Active' },
    content: { label: 'Content' },
  },
  ModelInstance: {
    name: { label: 'Name' },
    version: { label: 'Version', type: 'number' },
    description: { label: 'Description' },
    endpoint: { label: 'Endpoint' },
    cost: { label: 'Cost', type: 'float' },
    price: { label: 'Price', type: 'float' },
    prompt: { label: 'Prompt', type: 'code' },
    tempature: { label: 'Tempature', type: 'float' },
    maxTokens: { label: 'Max Tokens', type: 'number' },
    topP: { label: 'Top P', type: 'number' },
    bestOf: { label: 'Best Of', type: 'number' },
    n: { label: 'N', type: 'number' },
    stop: { label: 'Stop' },
    frequencyPenalty: { label: 'Frequency Penalty', type: 'number' },
    presencePenalty: { label: 'Presence Penalty', type: 'number' },
    required: { label: 'Required' },
  },
}
