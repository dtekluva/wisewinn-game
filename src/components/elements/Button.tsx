import * as React from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-gradient-to-r from-[#4C1961] to-[#FF000F] disabled:opacity-50 text-white',
  white: 'disabled:opacity-50 bg-white text-wise-gray-dark',
  greenery: 'bg-[#4BB44E] text-white',
  greenery_dark: 'bg-[#006839] text-white',
  greenery_darker: 'bg-[#004F26] text-white',
  unstyled: '',
};

const sizes = {
  xs: 'px-4 py-2.5 text-[13px] rounded font-semibold',
  sm: 'px-10 py-3 text-base rounded-[7px] font-semibold',
  smNoPadding: '',
  base: 'px-16 py-4 text-2xl rounded-[10px] font-semibold',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  centered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
} & IconProps;

export const Button: React.FunctionComponent<ButtonProps> = ({
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  startIcon,
  endIcon,
  children,
  centered = false,
  disabled = false,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        className={clsx(
          'space-x-2 rounded-lg transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60',
          variants[variant],
          sizes[size],
          className,
          !centered && 'flex items-center justify-between ',
          variant === 'primary' && 'primary-bg',
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading && <span>Loading</span>}
        {!isLoading && startIcon}
        {!isLoading && <span className='inline-block'>{children}</span>}
        {!isLoading && endIcon}
      </button>

      <style jsx>{`
        .primary-bg {
          background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
        }
      `}</style>
    </>
  );
};
