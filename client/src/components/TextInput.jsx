import { forwardRef } from 'react';

export function TextInput({ value, label, onChange, disabled, refs, ...rest }) {
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor="exampleFormControlInput1"
        className="form-label inline-block mb-2 text-gray-700"
      >
        {label}
      </label>
      <input
        value={value}
        disabled={disabled}
        type="text"
        className="
        block
        w-full
        px-2
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
        id="exampleFormControlInput1"
        placeholder={label}
        onChange={onChange}
        ref={refs}
        {...rest}
      />
    </div>
  );
}
