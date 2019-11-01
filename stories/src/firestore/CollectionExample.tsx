/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import {
  useCollection,
  useCreateDocument,
  useDeleteDocument,
} from '@jameslnewell/react-firebase/src/firestore';
import {wrap} from '../wrap';
import {useInput} from '../utils/useInput';

export default {
  title: 'firestore',
};

const collection = 'users';

export const CollectionExample: React.FC = wrap(() => {
  const [users, {status, error}] = useCollection(collection);
  const [createUser] = useCreateDocument(collection);
  const [deleteUser] = useDeleteDocument(collection);
  const [input, {clear}] = useInput();

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    clear();
    createUser({name: input.value});
  };

  const handleDeleteUser = (id: string): void => {
    deleteUser(id);
  };

  return (
    <>
      <h4>Users</h4>
      {status}
      {error && String(error)}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.docs.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.get('name')}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>-</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form onSubmit={handleCreateUser}>
        <input autoFocus={true} {...input} />
        <button>+ Add user</button>
      </form>
    </>
  );
});
