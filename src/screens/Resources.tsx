import React, {FC, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import TabScreenHeader from '../components/TabScreenHeader';
import firestore from '@react-native-firebase/firestore';
import Paragraph from '../components/typography/Paragraph';
import {useThemeContext} from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../components/typography/Heading';
import {FlatList} from 'react-native-gesture-handler';
import ThumbnailView from '../components/ThumbnailView';

const Resources: FC<any> = () => {
  const {colors, styles} = useThemeContext(viewStyles);
  const [resourceHistory, setResourceHistory] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // const resourceTypes = [
  //   {
  //     iconName: 'image',
  //     title: 'Images',
  //   },
  //   {
  //     iconName: 'videocam',
  //     title: 'Videos',
  //   },
  //   {
  //     iconName: 'description',
  //     title: 'Docs',
  //   },
  //   {
  //     iconName: 'grid-view',
  //     title: 'Others',
  //   },
  // ];
  // const resourceIconSize = 24;
  // const resourceIconTitleSize = 12;

  // const iconNamesToTypes: any = useMemo(
  //   () => ({
  //     video: 'play-circle-filled',
  //     image: 'image',
  //     document: 'description',
  //     other: 'grid-view',
  //     'application/pdf': 'description',
  //     'image/jpeg': 'image',
  //     'image/png': 'image',
  //     'image/jpg': 'image',
  //     'application/doc': 'description',
  //   }),
  //   [],
  // );

  // const resourceHistory = [
  //   {
  //     date: '6th Apr 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'image',
  //       },
  //       {
  //         id: '2',
  //         type: 'video',
  //       },
  //     ],
  //   },
  //   {
  //     date: '5th Apr 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'document',
  //       },
  //       {
  //         id: '2',
  //         type: 'document',
  //       },
  //       {
  //         id: '3',
  //         type: 'image',
  //       },
  //     ],
  //   },
  //   {
  //     date: '2nd Apr 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'video',
  //       },
  //       {
  //         id: '2',
  //         type: 'video',
  //       },
  //     ],
  //   },
  //   {
  //     date: '28th Mar 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'image',
  //       },
  //     ],
  //   },
  //   {
  //     date: '26th Mar 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'document',
  //       },
  //       {
  //         id: '2',
  //         type: 'video',
  //       },
  //       {
  //         id: '3',
  //         type: 'image',
  //       },
  //     ],
  //   },
  //   {
  //     date: '25th Mar 2022',
  //     resources: [
  //       {
  //         id: '1',
  //         type: 'image',
  //       },
  //       {
  //         id: '2',
  //         type: 'video',
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    firestore()
      .collection('Resources')
      .orderBy('created_at', 'desc')
      .onSnapshot(docSnapshot => {
        // console.log('doc res refs', docSnapshot.docs);
        setResourceHistory(
          docSnapshot?.docs
            .map(doc => {
              const {filename, name, type, size, created_at} = doc.data();
              const dt = new Date(created_at.seconds * 1000);
              console.log('dt', dt);
              return {
                id: filename,
                filename,
                name,
                type,
                size,
                createdAt: dt,
              };
            })
            .sort((a, b) => {
              if (a.createdAt > b.createdAt) return -1;
              if (a.createdAt < b.createdAt) return 1;
              return 0;
            })
            .filter(({name}) =>
              name.toLowerCase().includes(searchText.toLowerCase()),
            )
            .reduce((acc, item) => {
              if (
                acc.length === 0 ||
                acc[acc.length - 1].date !== item.createdAt.toDateString()
              ) {
                acc.push({
                  date: item.createdAt.toDateString(),
                  resources: [item],
                });
              } else {
                acc[acc.length - 1].resources.push(item);
              }
              return acc;
            }, []),
        );
      });
  }, [searchText]);

  console.log('history', resourceHistory);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title="Resources" />
      <View style={styles.mainView}>
        {/* <View style={styles.resourcesView}>
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
        </View> */}
        <View style={styles.searchBarContainerView}>
          <Heading.Bold size={12}>Search Filter</Heading.Bold>
          <View style={styles.searchBarView}>
            <TextInput
              style={styles.searchBarInput}
              onChangeText={value => setSearchText(value)}
            />
            <Icon name="search" style={styles.searchBarIcon} size={28} />
          </View>
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
                      const {type, filename, name, size} = resource;
                      return (
                        // <View style={styles.resourceMiniView}>
                        //   <Icon name={iconNamesToTypes[type]} size={36} />

                        // </View>
                        <ThumbnailView
                          type={type}
                          filename={filename}
                          name={name}
                          size={size}
                        />
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
    paddingTop: 10,
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
  searchBarContainerView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  searchBarView: {
    flexDirection: 'row',
    // padding: 0,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    alignItems: 'center',
    borderRadius: 5,
  },
  searchBarInput: {
    flex: 1,
    marginHorizontal: 5,
    // marginVertical: 0,
    // backgroundColor: 'green',
  },
  searchBarIcon: {
    padding: 5,
    // backgroundColor: 'yellow',
  },
};
