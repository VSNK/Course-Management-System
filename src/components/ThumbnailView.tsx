import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import Paragraph from './typography/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from './typography/Heading';
import {useThemeContext} from '../contexts/ThemeContext';
import * as Progress from 'react-native-progress';
import {useMakeItOffline} from '../utils/fileUtils';

const iconsTypesToNames: any = {
  'application/pdf': 'assignment',
  'image/jpeg': 'image',
  'image/png': 'image',
  'file/other': 'description',
};

type ThumbnailViewProps = {
  name: string;
  filename: string;
  type: string;
  size: number;
  onRemove?: () => void;
  showRemoveIcon?: boolean;
};

const ThumbnailView: FC<ThumbnailViewProps> = ({
  name,
  type = 'other',
  size,
  filename,
  showRemoveIcon = false,
}) => {
  const {styles} = useThemeContext(viewStyles);
  const {
    progress,
    makeOffline,
    isDownloaded,
    isDownloading,
    isPending,
    removeFile,
    openFile,
  } = useMakeItOffline(filename);

  return (
    <Pressable
      onPress={async () => {
        try {
          await makeOffline();
          await openFile();
        } catch (e) {
          console.log('error while opening file', e);
        }
      }}
      style={styles.resourceItemView}>
      {showRemoveIcon && (
        <View style={styles.resourceItemDeleteView}>
          <Icon name="close" style={styles.resourceItemDeleteIcon} />
        </View>
      )}
      <View style={styles.resourceItemIconView}>
        <Icon
          name={iconsTypesToNames[type]}
          size={28}
          style={styles.resourceItemIcon}
        />
      </View>
      <View style={styles.resourceTitleContainer}>
        <View style={styles.resourceItemTitleView}>
          <Heading.Medium size={12} style={styles.resourceItemTitle}>
            {name.length >= 25
              ? name.slice(0, 25) + '...' + name.slice(name.length - 6)
              : name}
          </Heading.Medium>
          <Paragraph.SemiBold size={12}>
            {Math.ceil(size / 1024)} KB
          </Paragraph.SemiBold>
        </View>
        <View style={styles.progressContainer}>
          {isPending && (
            <Icon
              name="file-download"
              onPress={() => makeOffline()}
              size={30}
            />
          )}
          {isDownloaded && (
            <Icon name="cancel" onPress={() => removeFile()} size={30} />
          )}
          {isDownloading && (
            <Progress.Circle size={30} progress={progress / 100} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ThumbnailView;

const viewStyles = {
  resourceItemView: {
    // flexDirection: 'row',
    // padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    marginBottom: 10,
    width: 250,
    // height: 170,
    marginRight: 10,
  },
  resourceListView: {marginBottom: 50},
  resourceItemIconView: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
  },
  resourceItemTitleView: {
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: 'blue',
    flex: 1,
  },
  resourceTitleContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  resourceItemTitle: {},
  resourceItemDeleteView: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  floatingBtnView: {
    paddingHorizontal: 16,
    // backgroundColor: 'yellow',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // position: 'absolute',
    // height: '100%',
    // width: '100%',
    // zIndex: 1,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
