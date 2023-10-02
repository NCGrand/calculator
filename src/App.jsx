import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
};

const evaluate = ({ previousOperand, currentOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "÷":
      computation = prev / current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
  }
  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });

const formatOperand = (operand) => {
  if (operand === undefined) {
    return;
  }
  const [integer, decimal] = operand.split('.');
  if (decimal === undefined) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: payload.digit
        }
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }

      if (payload.digit === '.' && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === undefined && state.previousOperand === undefined) {
        return state;
      }

      if (state.currentOperand === undefined) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previousOperand === undefined) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: undefined,
          operation: payload.operation
        }
      }
      
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: undefined,
        operation: payload.operation
      }
    case ACTIONS.EVALUATE:
      if (state.previousOperand === undefined || state.currentOperand === undefined || state.operation === undefined) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: undefined,
        currentOperand: evaluate(state),
        operation: undefined
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: undefined
        }
      }

      if (state.currentOperand === undefined) {
        return state;
      }

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: undefined
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };
  };
};

const App = () => {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="col-span-full flex flex-col items-end justify-around bg-slate-900 p-3 border-solid border-2 border-slate-200 rounded-xl">
        <div className="text-slate-200 text-sm opacity-75">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="text-slate-200 text-3xl">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <button className="col-span-2" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="col-span-2" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
};

export default App;
