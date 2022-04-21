import React, {createContext, FC, useContext, useState} from 'react';

const CourseContext = createContext<any>(null);

export const CourseProvider: FC<any> = ({children}) => {
  // const navigation = useNavigation();
  const [courseId, setCourseId] = useState('');

  return (
    <CourseContext.Provider value={{courseId, setCourseId}}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const value = useContext(CourseContext);

  return value;
};
