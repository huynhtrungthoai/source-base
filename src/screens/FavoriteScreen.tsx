import React, {createRef, FC, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStackScreenProps, goBack} from '../navigators';
import {colors} from '../theme';
import {ConfirmDialog, Header, Text} from '../components';
import {ScreenConst} from '../constants';
import {BlogList} from './Home/components';
import {useAppStore} from '../store/useAppStore';
import {IBlog} from '../types';
import {isEmpty, size} from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {alertSuccess} from '../utils/alert';

interface FavoriteScreenProps extends AppStackScreenProps<ScreenConst.FAVORITE_SCREEN> {}

export const FavoriteScreen: FC<FavoriteScreenProps> = function FavoriteScreen(_props) {
  const {favoriteList, updateFavoriteList} = useAppStore();
  const insets = useSafeAreaInsets();
  const confirmRef = createRef<any>();
  const selectedItem = useRef<IBlog>();

  const onFavoritePress = (item: IBlog) => {
    selectedItem.current = item;
    confirmRef.current?.show();
  };

  const onUpdateFavorite = () => {
    const removeExistItem = favoriteList.filter(blogItem => blogItem?.id !== selectedItem?.current?.id);
    updateFavoriteList(removeExistItem);
    alertSuccess({text: 'Remove blog to favorites successfully!', topOffset: insets.top});
    selectedItem.current = undefined;
  };

  return (
    <View style={styles.container}>
      <Header
        onLeftPress={goBack}
        safeAreaEdges={['top']}
        titleStyle={styles.headerTitle}
        backgroundColor={colors.palette.primary500}
        title={!isEmpty(favoriteList) ? `Favorite (${size(favoriteList)})` : 'Favorite'}
      />
      <ConfirmDialog
        ref={confirmRef}
        submitText={'Ok'}
        onCancel={() => {}}
        cancelText={'Cancel'}
        title={'Remove from favorite'}
        onSubmit={onUpdateFavorite}
        children={<Text>{'You want to remove this blog from favorite?'}</Text>}
      />
      <BlogList data={favoriteList} onFavoritePress={onFavoritePress} style={styles.blogContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerTitle: {color: '#FFF'},
  blogContent: {marginHorizontal: 16, paddingVertical: 16},
});
