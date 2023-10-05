import { useEffect, useState } from "react";
import { escapeRegExp } from "../../helpers";

interface OptionType {
  id: number;
  name: string;
}

interface ReturnValue {
  /** An array of options to show in the list */
  options: OptionType[];
  /** Boolean value that determines if the list is visible or not */
  showOptions: boolean;
  /** 
   * In certain situations, the component may need to decide whether or not to display options. 
   * In such cases, the component will set handleShowOptionsInternally to false, 
   * while at other times, it will default to true.
   * @default true
   */
  handleShowOptionsInternally: boolean;
  updateOptions: (value: string) => void;
  setShowOptions: (value: boolean) => void;
  setHandleShowOptionsInternally: (value: boolean) => void;
}

/** Custom hook for showing /hiding, getting and updating the options list */
export function useOptions(initialValue: string): ReturnValue {
  const [value, setValue] = useState(initialValue);
  const [data, setData] = useState<OptionType[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [handleShowOptionsInternally, setHandleShowOptionsInternally] = useState(true);

  useEffect(() => {
    // Function to fetch data
    async function fetchData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();

        setData(
          result.results.map((i: any, key: number) => ({
            id: key,
            name: i.name,
          }))
        );
      } catch (error) {
        console.log("err");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function filterData() {
      // Simulate an asynchronous operation with a delay (fetching data)
      await new Promise((resolve) =>
        setTimeout(() => {
          if (value) {
            const searchRegex = new RegExp(escapeRegExp(value), "i");
            setOptions(data.filter((option) => searchRegex.test(option.name)));
          }
          if (handleShowOptionsInternally) {
            // Display the suggestion list only when the value is not empty
            setShowOptions(value ? true : false);
          }
          resolve("success");
        }, 100)
      );
    }
    filterData();
  }, [value, data, handleShowOptionsInternally]);

  return {
    options,
    showOptions,
    handleShowOptionsInternally,
    setShowOptions,
    setHandleShowOptionsInternally,
    updateOptions: setValue,
  };
}
