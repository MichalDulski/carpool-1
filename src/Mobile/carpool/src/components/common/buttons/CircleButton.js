import React from 'react';
import UpView from '../UpView';
import sheet from '../../../styles/sheet';
import {vw} from '../../../utils/constants';

const CircleButton = ({style, icon, onPress, size = 16 * vw}) => {
  return (
    <UpView
      style={{
        width: size,
        height: size,
        ...style,
      }}
      contentContainerStyle={sheet.center}
      borderRadius={9999}
      onPress={onPress}>
      {icon}
    </UpView>
  );
};

export default CircleButton;
