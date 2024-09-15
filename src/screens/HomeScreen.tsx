import React, {FC} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppStackScreenProps, navigate} from '../navigators';
import {spacing} from '../theme';
import {Screen, Text} from '../components';
import {ScreenConst} from '../constants';
import {AppServices} from '../services';
import {IBlog} from '../types';
import Metrics from '../theme/metrics';

interface HomeScreenProps extends AppStackScreenProps<ScreenConst.HOME_SCREEN> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  const {data} = AppServices.GetBlogQuery();
  console.log(`🚀 ~ HomeScreen ~ data:`, data);

  const renderItem = ({item}: {item: IBlog}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(ScreenConst.WEB_SCREEN, {url: item?.url})}
        style={{width: Metrics.SCREEN_WIDTH}}>
        <Image source={{uri: item?.image_url}} style={{height: undefined, width: '100%', aspectRatio: 1.9}}></Image>
        <Text style={{fontWeight: 'bold', marginTop: 12}}>{item?.title}</Text>
        <Text style={{marginTop: 4}} numberOfLines={2}>
          {item?.summary}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={{height: 32}} />;

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <FlatList
        data={data?.results}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.id?.toString()}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
});
