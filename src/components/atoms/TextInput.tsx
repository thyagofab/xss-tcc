import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput = ({ label, id, ...props }: TextInputProps) => {
  return (
    <div className="text-input">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} {...props} />
    </div>
  );
};
