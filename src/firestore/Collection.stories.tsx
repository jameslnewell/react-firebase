import firebase from 'firebase';
import React from 'react';
import {Collection} from '.';
import {decorator} from '../__utilities__/decorator';

export default {
  title: 'firestore/Collection',
  decorators: [decorator],
};

const LoadingMessage: React.FC = () => <>Loading users...</>;
const EmptyMessage: React.FC = () => <>No users found.</>;
const ErroredMessage: React.FC = () => <>An error occurred fetching users.</>;

const UserList: React.FC<{users: firebase.firestore.QuerySnapshot}> = ({
  users,
}) => (
  <ul>
    {users.docs.map((user) => (
      <li key={user.id}>{user.get('name')}</li>
    ))}
  </ul>
);

const props = {
  path: 'users',
  loading: <LoadingMessage />,
  empty: <EmptyMessage />,
  errored: <ErroredMessage />,
};

export const Loaded: React.FC = () => (
  <Collection {...props}>{(users) => <UserList users={users} />}</Collection>
);

export const Empty: React.FC = () => (
  <Collection {...props} path="xyz">
    {(users) => <UserList users={users} />}
  </Collection>
);
