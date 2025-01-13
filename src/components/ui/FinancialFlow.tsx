'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Symbol {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  sign: string;
  size: number;
  duration: number;
}

interface Props {
  mouseX: number;
  mouseY: number;
  containerWidth: number;
}

export default function FinancialFlow({ mouseX, mouseY, containerWidth }: Props) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);

  const signs = [
    '/signs/eurosign.png',
    '/signs/flowsign.png',
    '/signs/transfersign.png'
  ];

  const getRandomStart = () => ({
    x: 50 + (Math.random() * 10 - 5),
    y: 25 + (Math.random() * 10 - 5)
  });

  const getRandomEnd = () => ({
    x: 50 + (Math.random() * 10 - 5),
    y: 75 + (Math.random() * 10 - 5)
  });

  const getRandomSize = () => 24 + Math.random() * 16;
  const getRandomDuration = () => 2.5 + Math.random() * 1;

  useEffect(() => {
    const createSymbol = () => {
      const start = getRandomStart();
      const end = getRandomEnd();
      return {
        id: `symbol-${Date.now()}-${Math.random()}`,
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
        sign: signs[Math.floor(Math.random() * signs.length)],
        size: getRandomSize(),
        duration: getRandomDuration()
      };
    };

    const initialSymbols = Array.from({ length: 12 }, createSymbol);
    setSymbols(initialSymbols);

    const interval = setInterval(() => {
      const newSymbol = createSymbol();
      setSymbols(prev => [...prev, newSymbol]);
      
      setTimeout(() => {
        setSymbols(prev => prev.filter(s => s.id !== newSymbol.id));
      }, 3500);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {symbols.map(symbol => (
        <motion.div
          key={symbol.id}
          className="absolute"
          initial={{ 
            left: `${symbol.startX}%`,
            top: `${symbol.startY}%`,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            left: `${symbol.endX}%`,
            top: `${symbol.endY}%`,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{
            duration: symbol.duration,
            ease: "easeInOut"
          }}
          style={{
            transform: `perspective(800px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          <Image
            src={symbol.sign}
            alt="Financial Symbol"
            width={symbol.size}
            height={symbol.size}
            style={{ width: `${symbol.size}px`, height: `${symbol.size}px` }}
          />
        </motion.div>
      ))}
    </div>
  );
} 