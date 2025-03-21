import React from "react";
import { CheckboxProps } from "../types/types";

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
}) => (
  <div className='flex items-center gap-3'>
    <input
      id={id}
      name={name}
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='h-5 w-5 text-blue-600 border-gray-300 rounded cursor-pointer'
    />
    <label htmlFor={id} className='text-sm text-gray-700'>
      {label}
    </label>
  </div>
);

export default Checkbox;
