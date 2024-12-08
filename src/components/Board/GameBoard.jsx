import React from 'react';
import Card from '../Card/Card';

const GameBoard = ({ board, handleCardClick, difficulty }) => {
  return (
    <div className={`game-board ${difficulty}`}>
      {board.map((card, index) => (
        <Card
          key={card.id}
          flipped={card.isFlipped || card.isMatched}
          onClick={() => handleCardClick(index)}
        >
          {card.content}
        </Card>
      ))}
    </div>
  );
};

export default GameBoard;

