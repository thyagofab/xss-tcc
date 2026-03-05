import { forwardRef, type InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, id, ...props }, ref) => {
  return (
    <div className="text-input">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} ref={ref} {...props} />
    </div>
  );
});

TextInput.displayName = 'TextInput';
