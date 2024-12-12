import React from 'react';
import Select from '../Select/Select';
import { Button } from '../Button/Button';

const Menu = ({ difficulty, setDifficulty, theme, setTheme, startGame }) => {
  return (
    <div className="menu">
      <Select
        value={difficulty}
        onChange={(value) => setDifficulty(value)}
        options={[
          { value: 'easy', label: 'Easy (4x4)' },
          { value: 'medium', label: 'Medium (6x6)' },
          { value: 'hard', label: 'Hard (8x8)' }
        ]}
      />
      <Select
        value={theme}
        onChange={(value) => setTheme(value)}
        options={[
          { value: 'animals', label: 'Animals' },
          { value: 'fruits', label: 'Fruits' }
        ]}
      />
      <Button onClick={startGame} className="start-button">Start Game</Button>
    </div>
  );
};

export default Menu;


