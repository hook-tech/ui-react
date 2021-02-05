import React from 'react';

import ReactDOM from 'react-dom';

import { getClassName } from '@hook-tech/core';
import { ISingleAnyChildProps, useEventListener } from '@hook-tech/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IPortalTheme } from './theme';

interface IStyledPortalProps {
  theme: IPortalTheme;
  positionTop: number;
  positionLeft: number;
  width: number;
}

const StyledPortal = styled.div<IStyledPortalProps>`
  position: absolute;
  top: ${(props: IStyledPortalProps): string => `${props.positionTop}px`};
  left: ${(props: IStyledPortalProps): string => `${props.positionLeft}px`};
  width: ${(props: IStyledPortalProps): string => `${props.width}px`};
  display: ${(props: IStyledPortalProps): string => (props.width > 0 ? 'block' : 'none')};
  ${(props: IStyledPortalProps): string => themeToCss(props.theme.background)};
`;

export interface IPortalProps extends IComponentProps<IPortalTheme>, ISingleAnyChildProps {
  below: React.RefObject<HTMLDivElement>;
}

export const Portal = React.forwardRef((props: IPortalProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const theme = useBuiltTheme('portals', props.variant, props.theme);
  const [positionTop, setPositionTop] = React.useState<number>(0);
  const [positionLeft, setPositionLeft] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);

  const updateSizes = React.useCallback((): void => {
    const belowNodeRect = props.below?.current?.getBoundingClientRect();
    if (!belowNodeRect) {
      return;
    }
    setPositionTop(belowNodeRect.bottom + window.pageYOffset);
    setPositionLeft(belowNodeRect.left + window.pageXOffset);
    setWidth(belowNodeRect.width);
  }, [props.below]);

  useEventListener(window, 'resize', (): void => {
    updateSizes();
  });

  useEventListener(window, 'scroll', (): void => {
    updateSizes();
  });

  React.useEffect((): void => {
    updateSizes();
  }, [updateSizes]);

  return ReactDOM.createPortal((
    <StyledPortal
      id={props.id}
      className={getClassName(Portal.displayName, props.className)}
      theme={theme}
      positionTop={positionTop}
      positionLeft={positionLeft}
      width={width}
      ref={ref}
    >
      {props.children}
    </StyledPortal>
  ), window.document.body);
});

Portal.displayName = 'Portal';
Portal.defaultProps = {
  ...defaultComponentProps,
};
