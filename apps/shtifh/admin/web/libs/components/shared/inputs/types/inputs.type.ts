export interface TextFieldProps {
  isInvalid: boolean;
  name: string;
  type: string;
  error?: string;
  placeholder?: string;
  label?: string;
}

export interface SearchFieldProps {
  width?: string;
  placeholder?: string;
  getValue: (value: string) => void;
}
