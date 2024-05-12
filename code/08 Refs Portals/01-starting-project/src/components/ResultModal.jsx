import {forwardRef, useImperativeHandle,useRef} from "react";

const ResultModal = forwardRef(function ResultModal({targetTime,timeRemaining, onReset},ref) {
    const dialog = useRef();
    const userLost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (1000 * targetTime)) * 100);
    useImperativeHandle(ref, ()=> {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    if (userLost) {
        return <dialog ref={dialog} className="result-modal">
            <h2>You lost!!</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining}</strong> seconds left.</p>
            <form method="dialog" onSubmit={onReset}>
                <button>
                    Close
                </button>
            </form>
        </dialog>;
    }
    return <dialog ref={dialog} className="result-modal">
            <h2>You score {score}.</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining}</strong> seconds left.</p>
            <form method="dialog" onSubmit={onReset}>
                <button>
                    Close
                </button>
            </form>
        </dialog>;
});

export default ResultModal;

