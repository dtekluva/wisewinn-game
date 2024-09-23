import clsx from 'clsx';

interface SpinnerProps {
  className?: string;
  pathClassName?: string;
  color?: string;
}

export function SmallSpinner({ className, pathClassName, color = '#fff' }: SpinnerProps) {
  return (
    <span className={clsx('flex h-4 w-4 animate-spin items-center justify-center', className)}>
      <svg
        fill="none"
        height={14}
        viewBox="0 0 14 14"
        width={14}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={pathClassName}
          d="M13 7a6 6 0 1 1-4.146-5.706"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>

      <span className="sr-only">Loading</span>
    </span>
  );
}
