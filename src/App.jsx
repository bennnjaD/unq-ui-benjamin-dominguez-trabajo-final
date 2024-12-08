import React, { useState, useEffect } from 'react';
import GameBoard from './components/Board/GameBoard.jsx';
import Timer from './components/Timer/Timer.jsx';
import Notification from './components/Notification/Notification.jsx';
import Menu from './components/Menu/Menu.jsx';
import  { Button } from './components/Button/Button.jsx';
import {emojiSets, difficultySettings, shuffleArray } from './utils/gameUtils';
import './App.css';

const createBoard = (difficulty) => {
  const { gridSize } = difficultySettings[difficulty];
  const emojis = emojiSets[difficulty].slice(0, gridSize / 2);
  const cards = [...emojis, ...emojis].map((content, index) => ({
    id: index,
    content,
    isFlipped: false,
    isMatched: false,
  }));

  return shuffleArray(cards);
};

const App = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const startGame = () => {
    setBoard(createBoard(difficulty));
    setSelectedCards([]);
    setMatchedPairs(0);
    setGameOver(false);
    setIsPlaying(true);
    setShowMenu(false);
  };

  const returnToMenu = () => {
    setIsPlaying(false);
    setShowMenu(true);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    if (!isPlaying) return;
    if (selectedCards.length < 2 && !board[index].isFlipped && !board[index].isMatched) {
      setBoard(prevBoard =>
        prevBoard.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );
      setSelectedCards(prev => [...prev, index]);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      const firstCard = board[firstIndex];
      const secondCard = board[secondIndex];
  
      if (firstCard.content === secondCard.content) {
        setBoard(prevBoard =>
          prevBoard.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
      } else {
        setTimeout(() => {
          setBoard(prevBoard =>
            prevBoard.map((card, i) =>
              i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
        }, 800);
      }
  
      setSelectedCards([]); 
    }
  }, [selectedCards, board]);
  

  return (
    <div className="memory-game">
      <h1 className="game-title">Memory Game</h1>
      {showMenu ? (
        <Menu difficulty={difficulty} setDifficulty={setDifficulty} startGame={startGame} />
      ) : (
        <>
          <GameBoard board={board} handleCardClick={handleCardClick} difficulty={difficulty} />
          <Timer initialTime={difficultySettings[difficulty].time} isPlaying={isPlaying} onTimeUp={handleTimeUp} />
          {gameOver && <Notification message={matchedPairs === board.length / 2 ? "Congratulations! You've completed the game!" : "Time's up!"} />}
          <Button onClick={returnToMenu} className="menu-button">Return to Menu</Button>
        </>
      )}
    </div>
  );
}

export default App;
