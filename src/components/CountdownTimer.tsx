import { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer = ({ targetDate, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      if (targetDate <= now) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;
      const seconds = differenceInSeconds(targetDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div className={`text-center ${className}`}>
        <span className="text-primary font-bold text-lg">Event Started!</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      <div className="text-center">
        <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 min-w-[60px] glow-neon">
          <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 min-w-[60px] glow-neon">
          <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 min-w-[60px] glow-neon">
          <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Minutes</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 min-w-[60px] glow-neon">
          <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;