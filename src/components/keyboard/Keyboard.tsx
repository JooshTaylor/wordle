import React from 'react';

import { Constants } from '../../constants';

import './keyboard.css';

interface KeyboardProps {
  selectCharacter: (char: string) => void;
  submitWord: () => void;
  deleteCharacter: () => void;
}

export function Keyboard(props: KeyboardProps): JSX.Element {
  return (
    <div>
      <div className='keyboard-row'>
        {Constants.Keyboard.TOP_ROW.map(char => (
          <button key={char} className='keyboard-key' onClick={() => props.selectCharacter(char)}>
            {char}
          </button>
        ))}
      </div>

      <div className='keyboard-row'>
        {Constants.Keyboard.MID_ROW.map(char => (
          <button key={char} className='keyboard-key' onClick={() => props.selectCharacter(char)}>
            {char}
          </button>
        ))}
      </div>

      <div className='keyboard-row'>
        <button key='enter' className='keyboard-key' onClick={props.submitWord}>
          ENTER
        </button>

        {Constants.Keyboard.BOT_ROW.map(char => (
          <button key={char} className='keyboard-key' onClick={() => props.selectCharacter(char)}>
            {char}
          </button>
        ))}

        <button key='delete' className='keyboard-key' onClick={props.deleteCharacter}>
          DEL
        </button>
      </div>
    </div>
  );
}