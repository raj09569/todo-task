import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {validateAuth} from '../utils/functions';
import {ROUTE_NAMES} from '../utils/constants';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    openLisingPage();
  }, []);

  function openLisingPage() {
    setTimeout(() => {
      navigation.navigate(ROUTE_NAMES.List);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appNameText}>To Do</Text>
      <Text style={styles.appVersionText}>V 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appVersionText: {
    fontSize: 14,
    fontWeight: 'normal',
    marginVertical: 10,
  },
});
