import React, { useState, useEffect } from 'react';
import GameBoard from './components/Board/GameBoard.jsx';
import Timer from './components/Timer/Timer.jsx';
import Notification from './components/Notification/Notification.jsx';
import Menu from './components/Menu/Menu.jsx';
import { Button } from './components/Button/Button.jsx';
import { difficultySettings, createBoard } from './utils/gameUtils';
import './App.css';

const App = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('animals');
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  

  const startGame = () => {
    setBoard(createBoard(difficulty, theme));
    setSelectedCards([]);
    setMatchedPairs(0);
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(true);
    setShowMenu(false);
  };

  const returnToMenu = () => {
    setIsPlaying(false);
    setShowMenu(true);
    setGameOver(false);
    setGameWon(false);
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

  useEffect(() => {
    if (matchedPairs === board.length / 2 && board.length > 0) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [matchedPairs, board]);

  return (
    <div className="memory-game">
      <h1 className="game-title">Memory Game</h1>
      {showMenu ? (
        <Menu 
          difficulty={difficulty} 
          setDifficulty={setDifficulty}
          theme={theme}
          setTheme={setTheme} 
          startGame={startGame} />
      ) : (
        <>
          <GameBoard board={board} handleCardClick={handleCardClick} difficulty={difficulty} />
          <Timer 
            initialTime={difficultySettings[difficulty].time} 
            isPlaying={isPlaying} 
            onTimeUp={handleTimeUp} 
          />
          {gameOver && !gameWon && <Notification message="Time's up! You lost." type="time-up" />}
          {gameWon && <Notification message="Congratulations! You've won the game!" type="win" />}
          <div className="game-controls">
            {gameWon && (
              <div className="game-over-buttons">
                <Button onClick={startGame} className="play-again-button">Play Again</Button>
              </div>
            )}
            {gameOver && !gameWon && (
              <div className="game-over-buttons">
                <Button onClick={startGame} className="play-again-button">Play Again</Button>
              </div>
            )}
            {!gameWon && !gameOver && (
              <Button onClick={returnToMenu} className="menu-button">Return to Menu</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;