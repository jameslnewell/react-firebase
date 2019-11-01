import * as React from 'react';
import {Collection} from '../../../package/src/firestore';
import {wrap} from '../wrap';

export default {
  title: 'firestore/Collection',
};

const LoadingMessage: React.FC = () => <>Loading users...</>;
const EmptyMessage: React.FC = () => <>No users found.</>;
const ErroredMessage: React.FC = () => <>An error occurred fetching users.</>;

const UserList: React.FC<{users: firebase.firestore.QuerySnapshot}> = ({
  users,
}) => (
  <ul>
    {users.docs.map(user => (
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

export const Loaded = wrap(() => (
  <Collection {...props}>{users => <UserList users={users} />}</Collection>
));

export const Empty = wrap(() => (
  <Collection {...props} path="xyz">
    {users => <UserList users={users} />}
  </Collection>
));
