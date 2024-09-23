import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-r from-[#4C1961] to-[#FF000F] disabled:opacity-50 text-white',
  greenry_light: 'bg-[#50B651] text-white',
  greenery: 'bg-[#4BB44E] text-white font-bold',
  greenery_dark: 'bg-[#006839] text-white',
  greenery_darker: 'bg-[#004F26] text-white',
  white: 'disabled:opacity-50 bg-white text-wise-gray-dark',
  unstyled: '!bg-[#4C1961]/30',
};

const sizes = {
  xs: 'px-4 py-2.5 text-[13px] rounded',
  sm: 'px-10 py-3 text-base rounded-[7px]',
  ap: 'text-sm font-bold rounded-[48px]',
  smNoPadding: '',
  noSize: '',
  base: 'px-16 py-4 text-2xl rounded-[10px]',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type LinkButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  centered?: boolean;
  onClick?: () => void;
} & IconProps;

export const LinkButton: React.FunctionComponent<LinkButton> = ({
  href = '/',
  className = '',
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  children,
  centered = false,
  onClick,
}) => {
  return (
    <>
      <Link href={href}>
        <div
          onClick={onClick}
          className={clsx(
            'space-x-2 rounded-lg font-medium transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-70',
            variants[variant],
            sizes[size],
            className,
            !centered && 'inline-flex items-center justify-between',
            variant === 'primary' && 'primary-bg',
          )}
        >
          {isLoading && <span className="inline-block w-full text-center">Loading</span>}
          {!isLoading && <span className="inline-block w-full text-center">{children}</span>}
        </div>
      </Link>

      <style jsx>{`
        .primary-bg {
          background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
        }
      `}</style>
    </>
  );
};
