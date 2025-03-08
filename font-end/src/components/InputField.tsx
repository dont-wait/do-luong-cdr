import React from "react";
import { InputFieldProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  ref,
  required = false,
  showPasswordToggle,
  showPasswordIcon,
}) => (
  <div className='mb-7'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-3'>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <div className='relative'>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full px-6 py-4 rounded-lg border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/30 text-base'
        placeholder={placeholder}
        required={required}
        ref={ref}
      />
      {showPasswordToggle && (
        <button
          type='button'
          onClick={showPasswordToggle}
          className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700 transition-colors duration-200'
          aria-label='Toggle password visibility'>
          {showPasswordIcon ? (
            <FontAwesomeIcon icon={faEyeSlash} className='ms-2' />
          ) : (
            <FontAwesomeIcon icon={faEye} className='ms-2' />
          )}
        </button>
      )}
    </div>
  </div>
);

export default InputField;
