import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { IInput } from "@/components/Input/prop";

const Input = React.forwardRef<HTMLDivElement, IInput>(
  (props, ref): React.ReactElement => {
    const {
      error,
      id,
      textArea = false,
      type = "text",
      label,
      ...others
    } = props;
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col relative" ref={ref}>
        <div className="flex">
          <ExclamationCircleIcon
            className={hasError ? "shrink-0 w-6 h-6 fill-red-600" : "hidden"}
          />
          <label htmlFor={id} className="font-semibold text-xl">
            {label}
          </label>
        </div>
        {textArea ? (
          <textarea
            className={`rounded-lg border-2 p-4 ${hasError ? "border-red-600" : "border-black"}`}
            id={id}
            {...others}
          />
        ) : (
          <input
            className={`border-2 rounded-lg h-10 w-full px-4 ${hasError ? "border-red-600" : "border-black"}`}
            type={type}
            id={id}
            {...others}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
