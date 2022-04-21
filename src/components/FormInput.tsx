import {View, TextInput, TextInputProps} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useThemeContext} from '../contexts/ThemeContext';

type FormInputProps = TextInputProps & {iconType: string};

const FormInput: FC<FormInputProps> = ({iconType, ...restProps}) => {
  const {styles} = useThemeContext(viewStyles);

  return (
    <View style={styles.inputView}>
      <View style={styles.inputIconView}>
        <Icon name={iconType} size={28} style={styles.inputIcon} />
      </View>
      <View style={styles.textInputView}>
        <TextInput {...restProps} style={styles.textInput} />
      </View>
    </View>
  );
};

export default FormInput;

const viewStyles = {
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 50,
    backgroundColor: 'white',
  },
  inputIconView: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputIcon: {
    color: '#ccc',
    backgroundColor: 'white',
  },
  textInputView: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: '100%',
    justifyContent: 'center',
  },
  textInput: {
    padding: 5,
    margin: 5,
    fontSize: 16,
    fontFamily: 'paragraphMedium',
  },
};
