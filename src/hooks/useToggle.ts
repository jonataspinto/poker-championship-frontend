import { useState } from "react";

export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, toggle, setIsOpen];
}
