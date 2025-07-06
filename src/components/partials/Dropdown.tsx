import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(options[0]); // useState for current option
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsOpen(!isOpen);
  };

  const select = (index: number) => {
    setCurrentOption(options[index]); // update state
    setIsOpen(false); // optionally close dropdown after selection
  };

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleMouseDownOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDownOutside);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDownOutside);
    };
  }, []);

  return (
    <div className="intSelect container" ref={dropdownRef}>
      <div className="intSelect field" onMouseDown={handleMouseDown}>
        <div className="arrow"></div>
        {currentOption}
      </div>

      <div
        ref={dropdownContainerRef}
        className={`intSelect optionContainer ${isOpen ? "active" : ""}`}
      >
        {options.map((val, index) => (
          <div
            className="intSelect option"
            onMouseUp={() => select(index)}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
