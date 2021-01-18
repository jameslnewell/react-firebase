/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import {useDocument, useUpdateDocument} from '../firestore';
import {useInput} from '../__utilities__/useInput';

const collection = `users`;
const id = `DgzaP4btqMqB4fK29YQk`;

export const DocumentExample: React.FC = () => {
  const [idInput] = useInput(id);
  const [nameInput, {clear}] = useInput();
  const [user, {status, error}] = useDocument(`${collection}/${idInput.value}`);
  const [update] = useUpdateDocument();

  const handleSubmitUpdatedUser = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    clear();
    update(`${collection}/${idInput.value}`, {name: nameInput.value});
  };

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
            <td>{user && user.id}</td>
            <td>{user && user.get('name')}</td>
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
