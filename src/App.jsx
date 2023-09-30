import { FaDivide, FaEquals, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

const App = () => {
  return (
    <div className="calculator-grid">
      <div className="col-span-full flex flex-col items-end justify-around bg-slate-900 p-3 border-solid border-2 border-slate-200 rounded-xl">
        <div className="text-slate-200 text-sm opacity-75">
          Previous Operand
        </div>
        <div className="text-slate-200 text-3xl">
          Current Operand
        </div>
      </div>
      <button className="col-span-2">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>x</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="col-span-2">=</button>
    </div>
  );
};

export default App;
