import React, {FC} from 'react';
import ScreenHeader from './ScreenHeader';
import {useDrawerNavigation} from '../contexts/DrawerContext';

const TabScreenHeader: FC<{title: string}> = ({title}) => {
  const drawerNavigation = useDrawerNavigation();
  return (
    <ScreenHeader
      title={title}
      iconName="menu"
      onIconPress={drawerNavigation.openDrawer}
    />
  );
};

export default TabScreenHeader;
