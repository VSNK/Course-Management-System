import {useNavigation} from '@react-navigation/native';
import React, {createContext, FC, useContext} from 'react';

const DrawerNavigationContext = createContext<any>(null);

export const DrawerNavigationProvider: FC<any> = ({children}) => {
  const navigation = useNavigation();
  return (
    <DrawerNavigationContext.Provider value={navigation}>
      {children}
    </DrawerNavigationContext.Provider>
  );
};

export const useDrawerNavigation = () => {
  const drawerNavigation = useContext(DrawerNavigationContext);

  return drawerNavigation;
};
