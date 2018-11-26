import * as React from 'react';

export function useInput() {
  const [value, setValue] = React.useState('');

  function clear() {
    setValue('');
  }

  function onChange(event) {
    setValue(event.target.value);
  }

  return [
    {
      value,
      onChange
    },
    {
      clear
    }
  ];
}
