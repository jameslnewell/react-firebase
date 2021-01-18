/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import {useCollection, useAddDocument, useDeleteDocument} from '../firestore';
import {decorator} from '../__utilities__/decorator';
import {useInput} from '../__utilities__/useInput';

export default {
  title: 'firestore',
  decorators: [decorator],
};

const collection = 'users';

export const CollectionExample: React.FC = () => {
  const [users, {status, error}] = useCollection(collection);
  const [addUser] = useAddDocument();
  const [deleteUser] = useDeleteDocument();
  const [input, {clear}] = useInput();

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    clear();
    addUser(collection, {name: input.value});
  };

  const handleDeleteUser = (id: string): void => {
    deleteUser(`${collection}/${id}`);
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
            users.docs.map((user) => (
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
};
