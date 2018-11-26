import * as React from 'react';
import {useDocument} from '../../src/firestore';
import {useInput} from '../utils/useInput';

export function UseDocumentExample() {
  const [user, methods] = useDocument('users/U5PYIbwEC2eFvAzY7IKu');
  const [input, {clear}] = useInput();
  
  function handleSubmit(event) {
    event.preventDefault();
    clear();
    methods.update({name: input.value})
  }

  return (
    <>
      <h4>User</h4>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user && user.name}</td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input autoFocus={true} {...input}/>
        <button>Update user</button>
      </form>
    </>
  )
}