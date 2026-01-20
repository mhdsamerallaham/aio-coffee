import { useState, useEffect } from 'react';

export const useRateLimit = (maxAttempts = 5, windowMs = 60000) => {
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (isBlocked) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked]);

  const checkRateLimit = () => {
    if (isBlocked) return false;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= maxAttempts) {
      setIsBlocked(true);
      setRemainingTime(Math.floor(windowMs / 1000));
      return false;
    }

    return true;
  };

  const resetAttempts = () => {
    setAttempts(0);
    setIsBlocked(false);
    setRemainingTime(0);
  };

  return {
    isBlocked,
    remainingTime,
    attempts,
    checkRateLimit,
    resetAttempts
  };
};
