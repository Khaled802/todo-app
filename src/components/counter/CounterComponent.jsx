import { useState } from "react"
import "./CounterComponent.css"
import CounterAddSub from "./CounterAddSub";


export default function CounterComponent() {

    const [count, updateCount] = useState(0);


    function increament(step) {
        updateCount(count + step)
    }

    function decrement(step) {
        updateCount(count - step)
    }

    function reset() {
        updateCount(0)
    }


    return (
        <div className="CounterComponent">
            <span className="counterValue"> {count} </span>
            <CounterAddSub step={1} increamentCnt={increament} decrementCnt={decrement}/>
            <CounterAddSub step={2} increamentCnt={increament} decrementCnt={decrement}/>
            <CounterAddSub step={5} increamentCnt={increament} decrementCnt={decrement}/>
            <div> <button className="resetCounterBtn" onClick={reset}> Reset Counter </button></div>
        </div>
    )
}