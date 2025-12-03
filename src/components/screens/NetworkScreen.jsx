import React from 'react';
import { AppScreen } from '@/components/AppScreen';
import { MotionAppScreenHeader, MotionAppScreenBody, headerAnimation, bodyAnimation } from '../../utils/motionConfig';
import NetworkSVG from '@/components/icons/NetworkSVG';

export default function NetworkScreen(props) {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Edit Network</AppScreen.Title>
        <AppScreen.Subtitle>Change colors, shapes, layout, etc.</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}>
        <NetworkSVG />
      </MotionAppScreenBody>
    </AppScreen>
  );
}
