import { useState } from "react";

export function useInputValue(value = "") {
  const [state, setState] = useState(value);
  const updateState = (event) => {
    setState(event.target.value);
  };
  return [state, updateState];
}
