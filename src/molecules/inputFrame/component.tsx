import React from 'react';

import { getClassName } from '@hook-tech/core';
import { ISingleAnyChildProps } from '@hook-tech/core-react';

import { IInputWrapperTheme, InputWrapper } from '../../atoms';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

export interface IInputFrameTheme {
  inputWrapperTheme?: IInputWrapperTheme;
}

export interface IInputFrameProps extends IMoleculeProps<IInputFrameTheme>, ISingleAnyChildProps {
  messageText?: string;
  isEnabled: boolean;
  inputWrapperVariant?: string;
}

// NOTE(krishan711): this component is intended to hold anything that would commonly be used alongside input wrapper (e.g. buttons)
export const InputFrame = (props: IInputFrameProps): React.ReactElement => {
  return (
    <InputWrapper
      id={props.id}
      className={getClassName(InputFrame.displayName, props.className)}
      theme={props.theme?.inputWrapperTheme}
      variant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={props.isEnabled}
    >
      {props.children}
    </InputWrapper>
  );
};

InputFrame.displayName = 'InputFrame';
InputFrame.defaultProps = {
  ...defaultMoleculeProps,
  iEnabled: true,
};
