import React, { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

interface TextBoxProps {
  onInput: (text: string) => any;
}

const TextBox: React.FC<TextBoxProps> = ({ onInput }) => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const handleInput = () => {
    if (value) {
      onInput(value);
      setValue("");
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <textarea
        rows={1}
        className="bg-slate-200 rounded-sm p-2 resize-none flex-1 text-sm h-min"
        onChange={handleChange}
        value={value}
        ref={textAreaRef}
      />
      <button
        onClick={handleInput}
        className="rounded-full w-8 h-8 text-xl flex justify-center align-middle font-bold bg-green-700 text-white"
      >
        &rarr;
      </button>
    </div>
  );
};

export default TextBox;
