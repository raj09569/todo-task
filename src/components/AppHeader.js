import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import constants, {COLORS, FONT_SIZES, ROUTE_NAMES} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {resetPush} from '../utils/functions';

export default function AppHeader({
  title,
  showBack,
  showAdd,
  showRefresh,
  onRefersh,
}) {
  const navigation = useNavigation();

  function menuNavigate(routeName) {
    navigation.navigate(routeName);
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <>
      <StatusBar barStyle={'default'} backgroundColor={COLORS.primaryColor} />
      <View style={styles.menuContainer}>
        <View style={styles.leftMenu}>
          {showBack && (
            <TouchableOpacity style={styles.menuItem} onPress={goBack}>
              <Image
                style={styles.menuItemImage}
                source={require('../assets/images/icons/back.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.menuBody}>
          {title && <Text style={styles.titleStyle}>{title}</Text>}
        </View>
        <View style={styles.rightMenu}>
          {showAdd && (
            <TouchableOpacity
              testID="addTodoButton"
              style={styles.menuItem}
              onPress={() => menuNavigate(ROUTE_NAMES.Add)}>
              <Image
                style={styles.menuItemImage}
                source={require('../assets/images/icons/add.png')}
              />
            </TouchableOpacity>
          )}
          {showRefresh && (
            <TouchableOpacity
              testID="refreshTodoList"
              style={styles.menuItem}
              onPress={onRefersh}>
              <Image
                style={styles.menuItemImage}
                source={require('../assets/images/icons/refresh.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: COLORS.primaryColor,
    height: Dimensions.get('window').height * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftMenu: {flex: 1, flexDirection: 'row', justifyContent: 'flex-start'},
  menuBody: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
  rightMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    color: 'white',
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  menuItem: {
    marginHorizontal: 5,
  },
  menuItemImage: {width: 24, height: 24},
});
