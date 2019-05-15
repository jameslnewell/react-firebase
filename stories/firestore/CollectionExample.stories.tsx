import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {
  useCollection,
  useCreateDocument,
  useDeleteDocument,
} from '../../src/firestore';
import {useInput} from '../utils/useInput';
import {Provider} from '../../src/app';
import {app} from '../utils/app';

const collection = 'users';

const UseCollectionExample: React.FC = () => {
  const [status, users, error] = useCollection(collection);
  const [, , createUser] = useCreateDocument(collection);
  const [, , deleteUser] = useDeleteDocument(collection);
  const [input, {clear}] = useInput();

  function handleCreateUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    clear();
    createUser({name: input.value});
  }

  function handleDeleteUser(id: string): void {
    deleteUser(id);
  }

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
          {users.map(([id, user]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{user && user.name}</td>
              <td>
                <button onClick={() => handleDeleteUser(id)}>-</button>
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

storiesOf('Firestore', module).add('Collection', () => (
  <Provider app={app}>
    <UseCollectionExample />
  </Provider>
));
