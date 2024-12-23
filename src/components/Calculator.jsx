import React, { useState, useEffect } from "react";
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
      return;
    }

    // Prevent multiple consecutive operators
    if (/[\+\-\*\/]$/.test(input) && /[\+\-\*\/]/.test(value)) {
      setIsOperatorDisabled(true); // Disable operators when a second operator is attempted
      return;
    }

    // Prevent adding an operator as the first character
    if (input === "" && /[\+\-\*\/]/.test(value)) {
      return;
    }

    // Prevent multiple dots in the same number
    const lastNumber = input.split(/[\+\-\*\/]/).pop(); // Get the last number in the input
    if (value === "." && lastNumber.includes(".")) {
      return; // Don't add another dot if the last number already contains one
    }

    // Append the value and reset operator disable state
    setInput(input + value);
    setIsOperatorDisabled(false); // Enable operators
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

      if (calculationResult === Infinity) {
        setResult("Cannot divide by zero");
      } else {
        setResult(calculationResult); // Display result
      }
      setReset(true); // Set reset flag to true after calculation
    } catch (error) {
      setResult("Error");
      console.error("Calculation Error:", error);
    }
  };

  // Keyboard event listener to capture key presses
  const handleKeyPress = (event) => {
    const key = event.key;

    // Handle numerical keys and operators
    if (/\d/.test(key) || /[\+\-\*\/\.]/.test(key)) {
      handleClick(key);
    }

    // Handle Enter key for calculation
    if (key === "Enter") {
      handleCalculate();
    }

    // Handle Backspace key for deleting
    if (key === "Backspace") {
      handleDelete();
    }

    // Handle Escape key for clearing
    if (key === "Escape") {
      handleClear();
    }
  };

  // Use useEffect to add the keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkNavy-dark p-4">
      <div className="calculator bg-deepBlue rounded-md shadow-md p-4 w-full max-w-md">
        <div className="display flex flex-col justify-end h-24 bg-lightGrey rounded-md p-4 mb-4">
          <div className="text-right text-xl md:text-2xl">{input || "0"}</div>
          <div className="text-right text-red-500 text-lg md:text-xl">
            {result}
          </div>
        </div>
        <div className="buttons grid grid-cols-4 gap-2 md:gap-4">
          {["7", "8", "9"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4 text-sm md:text-base"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("/")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 text-sm md:text-base ${
              isOperatorDisabled
                ? "btn-disabled btn-outline-warning"
                : "btn-outline-warning"
            }`}
          >
            /
          </button>
          {["4", "5", "6"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4 text-sm md:text-base"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("*")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 text-sm md:text-base ${
              isOperatorDisabled
                ? "btn-disabled btn-outline-warning"
                : "btn-outline-warning"
            }`}
          >
            *
          </button>
          {["1", "2", "3"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4 text-sm md:text-base"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("-")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 text-sm md:text-base ${
              isOperatorDisabled
                ? "btn-disabled btn-outline-warning"
                : "btn-outline-warning"
            }`}
          >
            -
          </button>
          {["00", "0", "."].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4 text-sm md:text-base"
            >
              {value}
            </button>
          ))}
          <button
            onClick={() => handleClick("+")}
            disabled={isOperatorDisabled}
            className={`py-2 px-4 text-sm md:text-base ${
              isOperatorDisabled
                ? "btn-disabled btn-outline-warning"
                : "btn-outline-warning"
            }`}
          >
            +
          </button>
          <button
            onClick={handleClear}
            className="btn-outline-danger py-2 px-4 text-sm md:text-base"
          >
            AC
          </button>
          <button
            onClick={handleDelete}
            className="btn-outline-danger py-2 px-4 text-sm md:text-base"
          >
            C
          </button>
          <button
            onClick={handleCalculate}
            className="btn-outline-success py-2 px-4 text-sm md:text-base"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
