import React from 'react';

export type Input = [
  {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  },
  {
    clear: () => void;
  },
];

export function useInput(initialValue = ''): Input {
  const [value, setValue] = React.useState(initialValue);

  function clear(): void {
    setValue('');
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return [
    {
      value,
      onChange,
    },
    {
      clear,
    },
  ];
}
