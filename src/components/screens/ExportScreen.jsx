import React from 'react';
import { AppScreen } from '@/components/AppScreen';
import { MotionAppScreenHeader, MotionAppScreenBody, headerAnimation, bodyAnimation } from '../../utils/motionConfig';

export default function ExportScreen(props) {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Export Network</AppScreen.Title>
        <AppScreen.Subtitle>Save it as image or text</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}>
        <div className="divide-y divide-gray-100">
          {/* Export content goes here */}
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  );
}
