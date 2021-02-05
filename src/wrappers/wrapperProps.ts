import { ISingleAnyChildProps } from '@hook-tech/core-react';

export interface IWrapperProps extends ISingleAnyChildProps {
  className?: string;
}

export const defaultWrapperProps = {
  className: '',
};
