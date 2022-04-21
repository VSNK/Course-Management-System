import {PermissionsAndroid} from 'react-native';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import 'react-native-get-random-values';
import * as uuid from 'uuid';

export const pickFiles = async (allowMultiSelection: boolean = true) => {
  try {
    const permResp = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    const GRANTED = PermissionsAndroid.RESULTS.GRANTED;
    if (
      permResp['android.permission.READ_EXTERNAL_STORAGE'] !== GRANTED ||
      permResp['android.permission.WRITE_EXTERNAL_STORAGE'] !== GRANTED
    ) {
      return null;
    }
    const resp = await DocumentPicker.pick({allowMultiSelection});
    return resp.map(({name, size, type, uri}) => ({name, size, type, uri}));
  } catch (e) {
    console.log('error while picking', e);
    return null;
  }
};

type FileParam = {
  name: string;
  size: number;
  type: string;
  uri: string;
};

type UploadFileRet = (file: FileParam) => Promise<{
  uri: string;
  name: string;
  size: number;
  type: string;
  filename: string;
  uuid: string;
} | null>;

export const uploadFile: UploadFileRet = async (file: FileParam) => {
  try {
    const randomUUID = uuid.v4();
    const uuidFilename = randomUUID + '.' + file.type?.split('/')[1];
    const stat = await RNFetchBlob.fs.stat(file.uri);
    await storage().ref(uuidFilename).putFile(stat.path);
    return {
      filename: uuidFilename,
      uuid: randomUUID,
      ...file,
      uri: stat.path,
    };
  } catch (e) {
    console.log('error while uploading', e);
    return null;
  }
};
