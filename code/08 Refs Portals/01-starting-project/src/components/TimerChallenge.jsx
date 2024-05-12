import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";
function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining,setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
        handleReset()
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining)=> prevTimeRemaining - 10 )
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    if (timerIsActive) {
        return (
            <>
                <ResultModal
                    ref={dialog}
                    targetTime={targetTime}
                    onReset ={handleReset}
                    timeRemaining={timeRemaining}/>
                <section className="challenge">
                    <h2>{title}</h2>
                    <p className="challenge-time">
                        {targetTime} second{targetTime > 1 ? "s" : undefined}
                    </p>
                    <button onClick={handleStop}>
                        Stop Challenge
                    </button>
                    <p className="active">Timer is running</p>
                </section>
            </>
        );
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost" timeRemaining={timeRemaining} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : undefined}
                </p>
                <button onClick={handleStart}>
                    Start Challenge
                </button>
                <p>Timer inactive</p>
            </section>
        </>
    );

}

export default TimerChallenge;