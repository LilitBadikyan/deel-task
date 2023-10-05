import { useMemo, useRef, useState } from "react";
import { HighlightedText } from "../HighlightedText";
import { debounce } from "../../helpers";
import { useOptions } from "./hook";

import "./styles.css";

/**
 * Autocomplete component that highlights the matching part of suggested options
 */
export function Autocomplete() {
  const itemsRef = useRef<Map<number, HTMLParagraphElement>>(new Map());
  const [value, setValue] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const { options, showOptions, updateOptions, setShowOptions } = useOptions(value);

  const debouncedUpdateOptions = useMemo(
    () => debounce((val: string) => {
        updateOptions(val);
    }),
    [updateOptions]
  );

  /** Scrolls to the option given the option id */
  const scrollToId = (id: number) => {
    const node = itemsRef.current.get(id);
    if (node !== undefined) {
      node.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value) {
        setShowOptions(false);
    }
    setActiveOptionIndex(-1);

    // debounced version of this function
    debouncedUpdateOptions(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (options.length === 0) return;
    
    if (e.key === "ArrowDown") {
    e.preventDefault();
      const idx =
        activeOptionIndex < options.length - 1 ? activeOptionIndex + 1 : 0;
      setActiveOptionIndex(idx);
      scrollToId(options[idx].id);
    } else if (e.key === "ArrowUp") {
    e.preventDefault();
      const idx =
        activeOptionIndex > 0 ? activeOptionIndex - 1 : options.length - 1;
      setActiveOptionIndex(idx);
      scrollToId(options[idx].id);
    } else if (e.key === "Enter" && activeOptionIndex >= 0) {
      setValue(options[activeOptionIndex].name);
      setActiveOptionIndex(-1);
      setShowOptions(false);
    }
  };

  const handleBlur = () => {
    setShowOptions(false);
    setActiveOptionIndex(-1);
  }

  const handleFocus = () => {
    if (value) {
      setShowOptions(true);
    }
  }

  return (
    <div className="container">
      <input
        className="autocomplete-input"
        placeholder="Search pokemon"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {showOptions && (
        <div className="autocomplete-list">
          {options.length === 0 ? (
            <div className="empty"> No data found </div>
          ) : (
            options.map((option, key) => {
              return (
                <div
                  key={option.id}
                  ref={(node) => {
                    if (node) {
                      itemsRef.current.set(option.id, node);
                    } else {
                      itemsRef.current.delete(option.id);
                    }
                  }}
                  className={key === activeOptionIndex ? "active" : ""}
                  onMouseDown={(e) => {
                    // to stop onblur on input
                    e.preventDefault();
                    setValue(option.name);
                    setShowOptions(false);
                  }}
                >
                  <HighlightedText text={option.name} highlight={value} />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
