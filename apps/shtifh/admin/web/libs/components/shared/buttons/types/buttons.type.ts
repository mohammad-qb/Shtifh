export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps {
  value: string;
  onClick?: (e?: any) => void;
  fullWidth?: boolean;
  isSubmit?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: ButtonSizeType;
  variant?: 'primary' | 'outlined';
}
