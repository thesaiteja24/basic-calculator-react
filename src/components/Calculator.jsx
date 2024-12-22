import React, { useState } from "react";
import Calc from "expression-calculator";

const Calculator = () => {
  const [input, setInput] = useState(""); // State for user input
  const [result, setResult] = useState(""); // State for calculation result
  const [isOperatorDisabled, setIsOperatorDisabled] = useState(false); // State to disable operators
  const [reset, setReset] = useState(false); // State to reset input after calculation

  // Regex to validate valid expressions
  const isValidExpression = (expression) => {
    const regex = /^(\d+(\.\d+)?)([\+\-\*\/](\d+(\.\d+)?))*$/;
    return regex.test(expression);
  };

  // Handles when a button is clicked
  const handleClick = (value) => {
    if (reset) {
      // Reset input and result if starting a new expression after evaluation
      setInput(value);
      setResult("");
      setReset(false);
    } else {
      // Prevent adding multiple consecutive operators
      if (/[\+\-\*\/]$/.test(input) && /[\+\-\*\/]/.test(value)) {
        setIsOperatorDisabled(true); // Disable operators when a second operator is attempted
        return;
      }

      // Append the value and reset operator disable state
      setInput(input + value);
      setIsOperatorDisabled(false); // Enable operators
    }
  };

  // Handle deleting the last character
  const handleDelete = () => {
    const updatedInput = input.slice(0, -1);
    setInput(updatedInput);

    // Re-enable operators if the last character was invalid
    if (!/[\+\-\*\/]$/.test(updatedInput)) {
      setIsOperatorDisabled(false);
    }
  };

  // Clears both input and result states
  const handleClear = () => {
    setInput("");
    setResult("");
    setIsOperatorDisabled(false); // Re-enable all operators
    setReset(false);
  };

  // Handles calculating the expression
  const handleCalculate = () => {
    try {
      if (!isValidExpression(input)) {
        setResult("Invalid Expression");
        return;
      }

      const calc = new Calc();
      calc.compile(input);
      const calculationResult = calc.calc();

      setResult(calculationResult); // Display result
      setReset(true); // Set reset flag to true after calculation
    } catch (error) {
      setResult("Error");
      console.error("Calculation Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkNavy-dark">
      <div className="calculator bg-deepBlue rounded-md shadow-md p-4 w-96">
        <div className="display flex flex-col justify-end h-24 bg-lightGrey rounded-md p-4 mb-4">
          <div className="text-right">{input || "0"}</div>
          <div className="text-right text-red-500">{result}</div>
        </div>
        <div className="buttons grid grid-cols-4 gap-4">
          {["7", "8", "9"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("/")}
            disabled={isOperatorDisabled} // Disable button if invalid
            className={`py-2 px-4 ${
              isOperatorDisabled ? "btn-disabled btn-outline-warning" : "btn-outline-warning"
            }`}
          >
            /
          </button>
          {["4", "5", "6"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("*")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 ${
              isOperatorDisabled ? "btn-disabled btn-outline-warning" : "btn-outline-warning"
            }`}
          >
            *
          </button>
          {["1", "2", "3"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("-")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 ${
              isOperatorDisabled ? "btn-disabled btn-outline-warning" : "btn-outline-warning"
            }`}
          >
            -
          </button>
          {["00", "0", "."].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("+")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 ${
              isOperatorDisabled ? "btn-disabled btn-outline-warning" : "btn-outline-warning"
            }`}
          >
            +
          </button>
          <button
            onClick={handleClear}
            className="btn-outline-danger py-2 px-4"
          >
            AC
          </button>
          <button
            onClick={handleDelete}
            className="btn-outline-danger py-2 px-4"
          >
            C
          </button>
          <button
            onClick={handleCalculate}
            className="btn-outline-success py-2 px-4"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
