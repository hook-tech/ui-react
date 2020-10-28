import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useBuiltTheme } from '../../theming';
import { IComponentProps, defaultComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { IListItemTheme } from './theme';

interface IStyledListItemProps {
  theme: IListItemTheme;
  isClickable: boolean;
}

const StyledListItem = styled.div<IStyledListItemProps>`
  ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: ${(props: IStyledListItemProps): string => (props.isClickable ? 'pointer' : 'default')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition-duration: 0.3s;

  &:hover {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.default?.background)};
    &:hover {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.hover?.background)};
    }
    &:active {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.press?.background)};
    }
    &:focus {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.focus?.background)};
    }
  }
  &.selected {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.default?.background)};
    &:hover {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.hover?.background)};
    }
    &:active {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.press?.background)};
    }
    &:focus {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.focus?.background)};
    }
  }
`;

export interface IListItemProps extends IComponentProps<IListItemTheme>, ISingleAnyChildProps {
  itemKey: string;
  isEnabled: boolean;
  isSelected: boolean;
  onClicked?(): void;
}

export const ListItem = (props: IListItemProps): React.ReactElement => {
  const onClicked = !props.onClicked ? undefined : (): void => {
    props.onClicked();
  };

  const theme = useBuiltTheme('listItems', props.variant, props.theme);
  return (
    <StyledListItem
      id={props.id}
      className={getClassName(ListItem.displayName, props.className, !props.isEnabled && 'disabled', props.isSelected && 'selected')}
      theme={theme}
      onClick={onClicked}
      isClickable={onClicked !== undefined}
      disabled={!props.isEnabled}
    >
      { props.children }
    </StyledListItem>
  );
};

ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isSelected: false,
};
