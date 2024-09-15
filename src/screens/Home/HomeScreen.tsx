import React, {createRef, FC, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppStackScreenProps} from '../../navigators';
import {spacing} from '../../theme';
import {Screen, ConfirmDialog, Text} from '../../components';
import {ScreenConst} from '../../constants';
import {AppServices} from '../../services';
import {BlogList} from './components';
import {IBlog} from 'src/types';
import {useAppStore} from '../../store/useAppStore';
import {isEmpty} from 'lodash';
import {alertSuccess} from '../../utils/alert';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HomeScreenProps extends AppStackScreenProps<ScreenConst.HOME_STACK> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  const {data, refetch} = AppServices.GetBlogQuery();
  const insets = useSafeAreaInsets();
  const confirmRef = createRef<any>();
  const {favoriteList, updateFavoriteList} = useAppStore();
  const [existItem, setExistItem] = useState<IBlog | undefined>(undefined);
  const selectedItem = useRef<IBlog>();

  const onRefresh = () => {
    refetch();
  };

  const onFavoritePress = (item: IBlog) => {
    const findExist = favoriteList.find(blogItem => blogItem?.id === item?.id);
    selectedItem.current = item;
    !isEmpty(findExist) ? setExistItem(findExist) : setExistItem(undefined);
    confirmRef.current?.show();
  };

  const onUpdateFavorite = () => {
    if (!isEmpty(existItem)) {
      const removeExistItem = favoriteList.filter(blogItem => blogItem?.id !== existItem?.id);
      updateFavoriteList(removeExistItem);
      alertSuccess({text: 'Remove blog to favorites successfully!', topOffset: insets.top});
      setExistItem(undefined);
    } else {
      selectedItem.current && updateFavoriteList([selectedItem.current, ...favoriteList]);
      alertSuccess({text: 'Add blog to favorites successfully!', topOffset: insets.top});
    }
  };

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={styles.container}>
      <ConfirmDialog
        ref={confirmRef}
        submitText={'Ok'}
        cancelText={'Cancel'}
        onCancel={() => {}}
        onSubmit={onUpdateFavorite}
        title={!isEmpty(existItem) ? 'Remove from favorite' : 'Add to favorite'}
        children={
          <Text>
            {!isEmpty(existItem)
              ? 'You want to remove this blog from favorite?'
              : 'You want to add this blog to favorite?'}
          </Text>
        }
      />
      <BlogList data={data?.results} onFavoritePress={onFavoritePress} onRefresh={onRefresh} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
});
