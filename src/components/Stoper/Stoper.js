import { useState } from 'react';
import style from './Stoper.module.scss';

const Stoper = () => {
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null)
    const [isRunning, setIsRunning] = useState(false);

    const startCounter = () => {
        if (!isRunning) {
            const now = Date.now() - time;
            const id = setInterval(() => {
                setTime(Date.now() - now);
            }, 1);

            setIntervalId(id);
            setIsRunning(true);
        }
    };

    const stopCounter = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIntervalId(null);
            setIsRunning(false);
        }
    };

    const resetCounter = () => {
        clearInterval(intervalId);
        setTime(0);
        setIsRunning(false);
        setIntervalId(null);
    };

    const msToTime = (milliseconds) => {
        const pad = (n, z = 2) => ('00' + n).slice(-z);
        const hh = pad(Math.floor(milliseconds / 3600000));
        const mm = pad(Math.floor((milliseconds % 3600000) / 60000));
        const ss = pad(Math.floor((milliseconds % 60000) / 1000));
        const mmm = pad(milliseconds % 1000, 3);
        return `${hh}:${mm}:${ss}.${mmm}`;
    };

    return (
        <div className={style.stoper}>
            <p className={style.timer}>{msToTime(time)}</p>
            <button className={style.button} onClick={startCounter}>Start</button>
            <button className={style.button} onClick={stopCounter}>Stop</button>
            <button className={style.button} onClick={resetCounter}>Reset</button>
        </div>
    );
};

export default Stoper;
