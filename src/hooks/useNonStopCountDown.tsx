import { useEffect, useState } from 'react';

export const useNonStopCountdown = (seconds: number) => {
  const counter = seconds;

  const [countTime, setCountTime] = useState(0);
  const COUNTER_ITEM_KEY = 'SAVED_COUNTER_ITEM';

  // const time = performance.now()

  // const [timeRender, setTimeRender] = useState(0);

  useEffect(() => {
    setCountTime(Number(window.localStorage.getItem(COUNTER_ITEM_KEY)) || Number(counter));
  }, [counter]);

  const initBeforeUnLoad = () => {
    console.log('On reload');
    window.onbeforeunload = () => {
      window.localStorage.setItem(COUNTER_ITEM_KEY, JSON.stringify(countTime - 2));
    };
  };

  useEffect(() => {
    initBeforeUnLoad();
    const interval = setInterval(() => {
      window.localStorage.setItem(COUNTER_ITEM_KEY, JSON.stringify(countTime));
      if (countTime > 0) {
        setCountTime(Number(countTime - 1));
      }
      if (countTime <= 0) {
        clearInterval(interval);
        window.localStorage.removeItem(COUNTER_ITEM_KEY);

        console.log('Timeout!');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countTime]);

  return { seconds: countTime };
};

// import { useEffect, useState } from 'react';

// export const useNonStopCountdown = (seconds: string) => {
//   // const counter = Number(seconds);

//   // const newTimerCount = useRef<number>(counter);
//   // console.log({counter, seconds, newTimerCount: newTimerCount.current}, "===>")

//   const [countTime, setCountTime] = useState(Number(seconds));

//   // console.log({counter},{countTime},{newTimerCount},{seconds},'herrrrrrrliberiangial')
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (countTime > 0) {
//         setCountTime(Number(countTime - 1));
//         // newTimerCount.current = countTime;
//         localStorage.setItem('CURRENT', countTime.toString());
//       }
//       if (countTime <= 0) {
//         clearInterval(interval);
//         localStorage.removeItem('CURRENT');
//         console.log('Ding!');
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [countTime]);
//   console.log({countTime, seconds })
//   return { seconds: countTime };
// };
