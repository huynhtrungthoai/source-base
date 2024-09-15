import React, {FC} from 'react';
import {FlatList, Image, RefreshControl, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {IBlog} from '../../../types';
import {navigate} from '../../../navigators';
import {ScreenConst} from '../../../constants';
import {Text} from '../../../components';
import {Images} from '../../../theme/images';
import {useAppStore} from '../../../store/useAppStore';
import {isEmpty} from 'lodash';
import Metrics from '../../../theme/metrics';
import moment from 'moment';

interface BlogListProps {
  data: IBlog[] | undefined;
  onRefresh?: () => void;
  onFavoritePress: (item: IBlog) => void;
  favoriteMode?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const BlogList: FC<BlogListProps> = _props => {
  const {data, onRefresh, onFavoritePress, favoriteMode, style} = _props;
  const {favoriteList} = useAppStore();

  const renderFavoriteIcon = (item: IBlog) => {
    if (favoriteMode) {
      return <Image source={Images.iconHeart} style={styles.iconSize} />;
    } else {
      const findFavorite = favoriteList.find(blogItem => blogItem.id === item?.id);
      if (!isEmpty(findFavorite)) {
        return <Image source={Images.iconHeart} style={styles.iconSize} />;
      } else {
        return <Image source={Images.iconHeartOutline} style={styles.iconSize} />;
      }
    }
  };

  const onItemPress = (item: IBlog) => {
    navigate(ScreenConst.WEB_SCREEN, {url: item?.url, title: item?.title});
  };

  const renderItem = ({item}: {item: IBlog}) => {
    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <Image source={{uri: item?.image_url}} style={styles.image} />
        <Text size="md" style={styles.title}>
          {item?.title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          Create at: {moment(item?.published_at).format('DD/MM/YYYY')}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {item?.summary}
        </Text>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onFavoritePress(item)}>
          {renderFavoriteIcon(item)}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => (
    <View style={styles.emptyView}>
      <Text>{'No favorite blog'}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isEmpty(data)) {
      return (
        <View style={styles.footerView}>
          <Text>{'Oops! No more to load'}</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <FlatList
      data={data}
      style={style}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item?.id?.toString()}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {height: 32},
  image: {height: undefined, width: '100%', aspectRatio: 1.9},
  title: {fontWeight: 'bold', marginTop: 12},
  subTitle: {marginTop: 4},
  iconSize: {height: 32, width: 32},
  favoriteButton: {position: 'absolute', top: 8, right: 8},
  emptyView: {justifyContent: 'center', alignItems: 'center', height: Metrics.SCREEN_HEIGHT * 0.7},
  footerView: {justifyContent: 'center', alignItems: 'center', height: 64},
});
