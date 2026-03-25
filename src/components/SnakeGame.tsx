import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export default function SnakeGame({ onScoreChange }: { onScoreChange: (score: number) => void }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const snakeRef = useRef(snake);

  // Keep snakeRef in sync with snake state
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  // Sync score with parent component
  useEffect(() => {
    onScoreChange(score);
  }, [score, onScoreChange]);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    onScoreChange(0);
    setIsGameOver(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const prevSnake = snakeRef.current;
    const head = prevSnake[0];
    const newHead = {
      x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
    };

    // Check collision with self
    if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...prevSnake];

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 10);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [direction, food, isGameOver, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div 
        className="grid bg-black/80 neon-border-blue rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1.5rem)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1.5rem)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`w-6 h-6 border border-white/5 ${
                isHead ? 'bg-glitch-cyan shadow-[0_0_10px_#00ffff]' : 
                isSnake ? 'bg-glitch-cyan/30' : 
                isFood ? 'bg-glitch-magenta shadow-[0_0_10px_#ff00ff] animate-pulse' : ''
              }`}
            />
          );
        })}
      </div>

      {isGameOver && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-20"
        >
          <h2 
            className="text-4xl font-black glitch-text mb-4 text-glitch-magenta uppercase italic"
            data-text="CRITICAL_FAILURE"
          >
            CRITICAL_FAILURE
          </h2>
          <p className="text-glitch-cyan text-xs tracking-widest mb-8 uppercase font-bold">
            DATA_LOST: {score} UNITS
          </p>
          <button
            onClick={resetGame}
            className="pixel-button"
          >
            REBOOT_SYSTEM
          </button>
        </motion.div>
      )}
    </div>
  );
}
