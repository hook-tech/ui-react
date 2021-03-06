import React from 'react';

import { getClassName } from '@hook-tech/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps } from '../../model';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { ITabBarItemTheme } from './theme';

interface IStyledTabBarItemProps {
  theme: ITabBarItemTheme;
}

const StyledTabBarItem = styled.button<IStyledTabBarItemProps>`
  ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  text-align: center;
  transition-duration: 0.3s;

  &.collapsible {
    flex-shrink: 1;
  }

  &.expandable {
    flex-grow: 1;
  }

  &:hover {
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.hover?.text)};
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.press?.text)};
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.focus?.text)};
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.default?.text)};
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.default?.background)};
    &:hover {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.hover?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.hover?.background)};
    }
    &:active {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.press?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.press?.background)};
    }
    &:focus {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.focus?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.disabled?.focus?.background)};
    }
  }
  &.selected {
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.default?.text)};
    ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.default?.background)};
    &:hover {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.hover?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.hover?.background)};
    }
    &:active {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.press?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.press?.background)};
    }
    &:focus {
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.focus?.text)};
      ${(props: IStyledTabBarItemProps): string => themeToCss(props.theme.selected?.focus?.background)};
    }
  }
`;

export interface ITabBarItemProps extends IComponentProps<ITabBarItemTheme> {
  tabKey: string;
  text: string;
  isEnabled?: boolean;
  isSelected?: boolean;
  isCollapsible?: boolean;
  isExpandable?: boolean;
  onClicked?(tabKey: string): void;
}

export const TabBarItem = (props: ITabBarItemProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.tabKey);
    }
  };

  const isEnabled = props.isEnabled == null ? true : props.isEnabled;
  const isExpandable = props.isExpandable == null ? true : props.isExpandable;
  const theme = useBuiltTheme('tabBarItems', props.variant, props.theme);
  return (
    <StyledTabBarItem
      id={props.id}
      className={getClassName(TabBarItem.displayName, props.className, !isEnabled && 'disabled', props.isSelected && 'selected', props.isCollapsible && 'collapsible', isExpandable && 'expandable')}
      theme={theme}
      onClick={onClicked}
      disabled={!isEnabled}
    >
      { props.text }
    </StyledTabBarItem>
  );
};

TabBarItem.displayName = 'TabBarItem';
TabBarItem.defaultProps = {
  ...defaultComponentProps,
};
