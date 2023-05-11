export const definitions = {
  User: {
    'username': {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    'name': {
      canSort: true,
    },

  },
  Preference: {
    'entity': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'value': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'User': {
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      reference: true,
    },
  },
  Property: {
    'name': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'type': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'value': {
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
    'language': {
      label: 'Language',
    },
    'entity': {
      label: 'Entity',
    },
    'value': {
      label: 'Value',
    },
  },
  Group: {
    'name': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'description': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },

  },
  GroupRole: {
    'createdAt': {
      label: 'Created At',
    },
    'role': true
  },
  GroupMember: {
    'createdAt': {
      label: 'Created At',
      order: 50,
    },
    'User': {
      reference: true,
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 100,
    },

    'Group': {
      label: 'Group',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 200,
    },
  },
  Log: {
    'createdAt': {
      label: 'Created At',
    },
    'updatedAt': {
      label: 'Updated At',
    },
    'message': {
      label: 'Message',
    },
    source: {
      label: 'Source',
    }
  },
  Activity: {
    'createdAt': {
      label: 'Created At',
      canSort: true,
    },
    'ModelInstance': {
      label: 'Model Instance',
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid'
    },

    'User': {
      label: 'User',
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid'
    },
  },
  Memory: {
    'createdAt': {
      label: 'Created At',
      canSort: true,
    },
    'source': {
      label: 'Source',
    },
    'title': {
      label: 'Title',
      canSort: true,
    },
    'active': {
      label: 'Active',
    },
  },
  MemoryChunk: {
    'createdAt': {
      label: 'Created At',
      canSort: true,
    },
    'title': {
      label: 'Title',
    },
    'active': {
      label: 'Active',
    }
  },
  ModelInstance: {
    'name': {
      label: 'Name',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'version': {
      label: 'Version',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'createdAt': {
      label: 'Created At',
      canSort: true,

    },
    'updatedAt': {
      label: 'Updated At',
      canSort: true,
    },
  },
  Thread: {
    /*cuid      String     @id @default(cuid())
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  userCuid  String?
  */
    'createdAt': {
      label: 'Created At',
    },
    'updatedAt': {
      label: 'Updated At',
    },
    'userCuid': {
      label: 'User Cuid',
    },
  }
}