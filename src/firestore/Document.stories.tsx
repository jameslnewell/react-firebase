import React from 'react';
import {Document, DocumentSnapshot} from '.';
import {decorator} from '../__utilities__/decorator';

export default {
  title: 'firestore/Document',
  decorators: [decorator],
};

const LoadingMessage: React.FC = () => <>Loading user...</>;
const UnfoundMessage: React.FC = () => <>User cannot be found.</>;
const ErroredMessage: React.FC = () => (
  <>An error occurred fetching the user.</>
);

const User: React.FC<{user: DocumentSnapshot}> = ({user}) => (
  <p>{user.get('name')}</p>
);

const props = {
  path: 'users/DgzaP4btqMqB4fK29YQk',
  loading: <LoadingMessage />,
  unfound: <UnfoundMessage />,
  errored: <ErroredMessage />,
};

export const Loaded: React.FC = () => (
  <Document {...props}>{(user) => <User user={user} />}</Document>
);

export const Unfound: React.FC = () => (
  <Document {...props} path="users/userid-does-not-exist">
    {(user) => <User user={user} />}
  </Document>
);
