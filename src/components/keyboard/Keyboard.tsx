import React from 'react';

interface KeyboardProps {
  selectCharacter: (char: string) => void;
  submitWord: () => void;
}

export function Keyboard(props: KeyboardProps): JSX.Element {
  return (
    <div>
      <button onClick={() => props.selectCharacter('w')}>Click me to set a cell</button>
      <button onClick={props.submitWord}>Submit</button>
    </div>
  );
}