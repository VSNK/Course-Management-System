import React, {FC, useMemo} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import TabScreenHeader from '../components/TabScreenHeader';
import Paragraph from '../components/typography/Paragraph';
import {useThemeContext} from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../components/typography/Heading';
import {FlatList} from 'react-native-gesture-handler';

const Resources: FC<any> = ({route}) => {
  const {colors, styles} = useThemeContext(viewStyles);
  const {name: courseName = 'Sample'} = route.params;

  const resourceTypes = [
    {
      iconName: 'image',
      title: 'Images',
    },
    {
      iconName: 'videocam',
      title: 'Videos',
    },
    {
      iconName: 'description',
      title: 'Docs',
    },
    {
      iconName: 'grid-view',
      title: 'Others',
    },
  ];
  const resourceIconSize = 24;
  const resourceIconTitleSize = 12;

  const iconNamesToTypes: any = useMemo(
    () => ({
      video: 'play-circle-filled',
      image: 'image',
      document: 'description',
      other: 'grid-view',
    }),
    [],
  );

  const resourceHistory = [
    {
      date: '6th Apr 2022',
      resources: [
        {
          id: '1',
          type: 'image',
        },
        {
          id: '2',
          type: 'video',
        },
      ],
    },
    {
      date: '5th Apr 2022',
      resources: [
        {
          id: '1',
          type: 'document',
        },
        {
          id: '2',
          type: 'document',
        },
        {
          id: '3',
          type: 'image',
        },
      ],
    },
    {
      date: '2nd Apr 2022',
      resources: [
        {
          id: '1',
          type: 'video',
        },
        {
          id: '2',
          type: 'video',
        },
      ],
    },
    {
      date: '28th Mar 2022',
      resources: [
        {
          id: '1',
          type: 'image',
        },
      ],
    },
    {
      date: '26th Mar 2022',
      resources: [
        {
          id: '1',
          type: 'document',
        },
        {
          id: '2',
          type: 'video',
        },
        {
          id: '3',
          type: 'image',
        },
      ],
    },
    {
      date: '25th Mar 2022',
      resources: [
        {
          id: '1',
          type: 'image',
        },
        {
          id: '2',
          type: 'video',
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title="Resources" />
      <View style={styles.mainView}>
        <View style={styles.resourcesView}>
          {resourceTypes.map(({iconName, title}) => {
            return (
              <View style={styles.resourceIconView}>
                <View style={styles.resourceIconWrapper}>
                  <Icon
                    name={iconName}
                    size={resourceIconSize}
                    style={styles.resourceIcon}
                  />
                </View>
                <Heading.SemiBold
                  size={resourceIconTitleSize}
                  style={styles.resourceIconTitle}>
                  {title}
                </Heading.SemiBold>
              </View>
            );
          })}
        </View>
        <View style={styles.historyView}>
          <Heading.Bold size={12} style={styles.historyViewTitle}>
            History
          </Heading.Bold>
          <FlatList
            data={resourceHistory}
            keyExtractor={item => item.date}
            renderItem={({item}) => {
              const {date, resources} = item;
              return (
                <View key={date} style={styles.historyItemView}>
                  <Heading.SemiBold
                    style={styles.historyItemViewTitle}
                    size={12}>
                    {date}
                  </Heading.SemiBold>
                  <FlatList
                    data={resources}
                    horizontal={true}
                    keyExtractor={res => res.id}
                    renderItem={({item: resource}) => {
                      const {type} = resource;
                      return (
                        <View style={styles.resourceMiniView}>
                          <Icon name={iconNamesToTypes[type]} size={36} />
                        </View>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Resources;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    padding: 0,
    margin: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  resourcesView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    paddingTop: 20,
  },
  resourceIconView: {
    width: 90,
    alignItems: 'center',
    padding: 5,
    // backgroundColor: 'green',
    marginRight: 0.1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  resourceIconWrapper: {
    width: 50,
    height: 50,
    marginBottom: 6,
    backgroundColor: '#d9d9d9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyView: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    paddingBottom: 100,
  },
  historyViewTitle: {
    marginBottom: 15,
  },
  historyItemView: {
    marginBottom: 12,
  },
  historyItemViewTitle: {
    marginBottom: 8,
  },
  resourceMiniView: {
    width: 100,
    height: 70,
    backgroundColor: '#d9d9d9',
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
