import { COLLECTION_TYPE_PREFIX, TOKEN_TYPES } from '../constants';

const schema = {
  kind: 'collectionType',
  collectionName: `${COLLECTION_TYPE_PREFIX}tokens`,
  info: {
    singularName: 'token',
    pluralName: 'tokens',
    displayName: 'Token',
    description: 'Token for external services',
  },

  options: {
    draftAndPublish: false,
  },

  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
  },

  attributes: {
    type: {
      type: 'enumeration',
      enum: TOKEN_TYPES,
      required: true,
    },

    token: {
      type: 'string',
      required: true,
    },

    expiresAt: {
      type: 'datetime',
    },
  },
};

export default {
  schema,
};
