// src/Calculator.jsx
// Import React and necessary hooks for managing state
import React, { useState } from "react";

// Import the "expression-calculator" library for evaluating mathematical expressions
import Calc from "expression-calculator";

const Calculator = () => {
  // State to store the user input as a string
  const [input, setInput] = useState("");

  // State to store the result of the evaluated expression
  const [result, setResult] = useState("");

  // Handles when a button is clicked, appending the value to the input string
  const handleClick = (value) => {
    setInput(input + value);
  };

  // Handles deleting the last character from the input string
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  // Clears both the input and result states
  const handleClear = () => {
    setInput("");
    setResult("");
  };

  // Handles evaluating the mathematical expression in the input string
  const handleCalculate = () => {
    try {
      const calc = new Calc(); // Initialize an empty Calc instance
      calc.compile(input); // Compile the input expression into RPN (Reverse Polish Notation)
      const result = calc.calc(); // Evaluate the compiled expression
      setResult(result); // Update the result state with the calculation result
    } catch (error) {
      setResult("Error"); // Set result to "Error" if any syntax or runtime error occurs
    }
  };

  return (
    // Main container: centers the calculator vertically and horizontally on the screen
    <div className="flex flex-col items-center justify-center h-screen bg-darkNavy-dark">
      {/* Calculator body */}
      <div className="calculator bg-deepBlue rounded-md shadow-md p-4 w-96">
        {/* Display area for showing input and result */}
        <div className="display flex flex-col justify-end h-24 bg-lightGrey rounded-md p-4 mb-4">
          {/* Shows the user input or "0" if input is empty */}
          <div className="text-right">{input || "0"}</div>
          {/* Shows the calculation result */}
          <div className="text-right">{result}</div>
        </div>

        {/* Buttons section */}
        <div className="buttons grid grid-cols-4 gap-4">
          {/* Number buttons (7, 8, 9) */}
          {["7", "8", "9"].map((value) => (
            <button
              onClick={() => handleClick(value)} // Add the button value to input
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          {/* Division operator */}
          <button
            onClick={() => handleClick("/")}
            className="btn-outline-warning py-2 px-4"
          >
            /
          </button>

          {/* Number buttons (4, 5, 6) */}
          {["4", "5", "6"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          {/* Multiplication operator */}
          <button
            onClick={() => handleClick("*")}
            className="btn-outline-warning py-2 px-4"
          >
            *
          </button>

          {/* Number buttons (1, 2, 3) */}
          {["1", "2", "3"].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          {/* Subtraction operator */}
          <button
            onClick={() => handleClick("-")}
            className="btn-outline-warning py-2 px-4"
          >
            -
          </button>

          {/* Additional buttons (00, 0, .) */}
          {["00", "0", "."].map((value) => (
            <button
              onClick={() => handleClick(value)}
              key={value}
              className="btn-outline-primary py-2 px-4"
            >
              {value}
            </button>
          ))}
          {/* Addition operator */}
          <button
            onClick={() => handleClick("+")}
            className="btn-outline-warning py-2 px-4"
          >
            +
          </button>

          {/* Clear all (AC) button */}
          <button
            onClick={handleClear}
            className="btn-outline-danger py-2 px-4"
          >
            AC
          </button>
          {/* Delete last character (C) button */}
          <button
            onClick={handleDelete}
            className="btn-outline-danger py-2 px-4"
          >
            C
          </button>
          {/* Equals (=) button for calculating the result */}
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
