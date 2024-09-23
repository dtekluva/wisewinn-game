import * as React from 'react';
import clsx from 'clsx';

import { Icon } from '@/components/elements';

interface AlertProps {
  hasActions?: boolean;
  hasTitle?: boolean;
  icon?: string;
  title?: string;
  text: string;
  children?: React.ReactNode;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  hasActions = false,
  hasTitle = true,
  icon,
  title,
  text,
  children,
}) => {
  return (
    <div className="rounded-md border border-violet-4 bg-violet-4 p-4">
      <div className="flex">
        <div className="flex-shrink-0 pt-1">
          <Icon key={icon} id={icon as string} width="16" height="16" />
        </div>
        <div className="ml-3">
          {hasTitle && (
            <h3 className="text-sm font-medium text-violet-12">{title}</h3>
          )}

          <div className={clsx('text-sm text-violet-11', hasTitle && 'mt-2')}>
            <p>{text}</p>
          </div>

          {hasActions && (
            <div className={clsx(Boolean(children) && 'mt-3')}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AlertMini: React.FunctionComponent<AlertProps> = ({
  hasActions = false,
  hasTitle = true,
  icon,
  title,
  text,
  children,
}) => {
  return (
    <div className="rounded-md border border-purple-4 bg-purple-4 p-4">
      <div className="flex">
        <div className="flex-shrink-0 pt-1">
          <Icon key={icon} id={icon as string} width="16" height="16" />
        </div>
        <div className="ml-3">
          {hasTitle && (
            <h3 className="text-sm font-medium text-violet-12">{title}</h3>
          )}

          <div className={clsx('text-sm text-violet-11', hasTitle && 'mt-2')}>
            <p>{text}</p>
          </div>

          {hasActions && (
            <div className={clsx(Boolean(children) && 'mt-3')}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};
