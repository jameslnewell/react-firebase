import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useDocument, useUpdateDocument} from '../../src/firestore';
import {useInput} from '../utils/useInput';
import {Provider} from '../../src/app';
import {app} from '../utils/app';

const collection = `users`;
const id = `U5PYIbwEC2eFvAzY7IKu`;

const UseDocumentExample: React.FC = () => {
  const [idInput] = useInput(id);
  const [nameInput, {clear}] = useInput();
  const [status, user, error] = useDocument(`${collection}/${idInput.value}`);
  const [, , update] = useUpdateDocument(`${collection}`);

  function handleSubmitUpdatedUser(
    event: React.FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();
    clear();
    update(idInput.value, {name: nameInput.value});
  }

  return (
    <>
      <h4>User</h4>
      {status}
      {error && String(error)}
      <br />
      <label>
        ID: <input autoFocus={true} {...idInput} />
      </label>
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user && id}</td>
            <td>{user && user.name}</td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleSubmitUpdatedUser}>
        <input {...nameInput} />
        <button>Update name</button>
      </form>
    </>
  );
};

storiesOf('Firestore', module).add('Document', () => (
  <Provider app={app}>
    <UseDocumentExample />
  </Provider>
));
