import * as React from 'react';
import {useCollection} from '../../src/firestore';
import {useInput} from '../utils/useInput';

export function UseCollectionExample() {
  const [users, {add}] = useCollection('users');
  const [input, {clear}] = useInput();
  
  function handleSubmit(event) {
    event.preventDefault();
    clear();
    add({name: input.value});
  }

  return (
    <>
      <h4>Users</h4>
      <table>
        <tbody>
          {users.map(([id, user, meta]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{user && user.name}</td>
              <td><button onClick={() => meta.delete()}>-</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input autoFocus={true} {...input}/>
        <button>+ Add user</button>
      </form>
    </>
  )
}