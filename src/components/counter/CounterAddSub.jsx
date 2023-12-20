import "./CounterComponent.css";


export default function CounterAddSub({step, increamentCnt, decrementCnt}) {

    function increament() {
        increamentCnt(step)
    }

    function decrement() {
        decrementCnt(step)
    }


    return (
        <div> 
            <button className="counterBtn" onClick={increament}> +{step} </button>
            <button className="counterBtn" onClick={decrement}> -{step} </button>
        </div>
    )
}