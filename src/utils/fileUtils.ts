import {PermissionsAndroid, ToastAndroid} from 'react-native';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'react-native-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import 'react-native-get-random-values';
import * as uuid from 'uuid';
import FileViewer from 'react-native-file-viewer';
import {useCallback, useEffect, useState} from 'react';

export const FILE_PATH = '/storage/emulated/0/Android/data/com.cms/files';

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
    console.log('file', file);
    const stat = await RNFetchBlob.fs.stat(file.uri);
    console.log('file stat', stat);
    await storage().ref(uuidFilename).putFile(stat?.path);
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

export const doesFileExistLocally = async (filename: string) => {
  try {
    const filepath = FILE_PATH + '/' + filename;
    const doesExist = await RNFetchBlob.fs.exists(filepath);
    return doesExist;
  } catch (e) {
    console.log('error while checking if file exists', e);
    return null;
  }
};

// const downloadFile = (filename: string) => {
//   return storage()
//     .ref(filename)
//     .getDownloadURL()
//     .then(url => {
//       return RNFetchBlob.config({
//         fileCache: true,
//         addAndroidDownloads: {
//           useDownloadManager: true,
//           notification: false,
//           path: '',
//         },
//       }).fetch('GET', url);
//     })
//     .catch(() => null);
// };

export const useMakeItOffline = (filename: string) => {
  const [progress, setProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState<
    'downloading' | 'downloaded' | 'pending'
  >('pending');
  useEffect(() => {
    (async () => {
      if (await doesFileExistLocally(filename)) {
        setDownloadStatus('downloaded');
      }
    })();
  }, [filename]);
  const makeOffline = useCallback(async () => {
    try {
      if ((await doesFileExistLocally(filename)) === false) {
        const downloadUrl = await storage().ref(filename).getDownloadURL();
        setDownloadStatus('downloading');
        await RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: false,
            path: FILE_PATH + '/' + filename,
          },
        })
          .fetch('GET', downloadUrl)
          .progress((received, total) => {
            console.log('progress', received / total);
            setProgress(Math.floor(received / total) * 100);
          });
        setDownloadStatus('downloaded');
      } else {
        setDownloadStatus('downloaded');
      }
    } catch (e) {
      setDownloadStatus('pending');
      console.log('error while making file offline', e);
    }
  }, [filename]);
  const removeFile = useCallback(async () => {
    try {
      if (await doesFileExistLocally(filename)) {
        await RNFetchBlob.fs.unlink(FILE_PATH + '/' + filename);
        ToastAndroid.show(
          `${filename} is removed locally.`,
          ToastAndroid.SHORT,
        );
        setDownloadStatus('pending');
      }
    } catch (e) {
      setDownloadStatus('pending');
      console.log('error while making file offline', e);
    }
  }, [filename]);
  const openFile = useCallback(async () => {
    try {
      await FileViewer.open(FILE_PATH + '/' + filename);
    } catch (e) {
      console.log('error while opening file', e);
    }
  }, [filename]);
  return {
    progress,
    makeOffline,
    removeFile,
    openFile,
    isDownloaded: downloadStatus === 'downloaded',
    isDownloading: downloadStatus === 'downloading',
    isPending: downloadStatus === 'pending',
    downloadStatus,
  };
};
