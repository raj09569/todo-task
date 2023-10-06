import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {
  COLORS,
  FONT_SIZES,
  ROUTE_NAMES,
  SESSION_KEYS,
} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAuth} from '../utils/functions';
import {mLeft10} from '../utils/STYLE';

export default function List() {
  const [todoList, setTodoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    /**
     * Fetching list of todos
     * from async storage
     */
    fetchTodoList();
  }, []);

  async function fetchTodoList() {
    await AsyncStorage.getItem(SESSION_KEYS.todoList).then(list => {
      if (list) {
        list = JSON.parse(list);
        setTodoList(list);
      }
    });
  }

  function onRefersh() {
    fetchTodoList();
  }

  function deleteTodo(id) {
    /**
     * validating local device authentication
     * to delete todo
     */
    validatingAuth(async () => {
      let newArray = [...todoList];
      newArray.splice(
        newArray.findIndex(todo => (todo.id = id)),
        1,
      );
      await AsyncStorage.setItem(
        SESSION_KEYS.todoList,
        JSON.stringify(newArray),
      ).then(() => {
        fetchTodoList();
      });
    });
  }

  function updateStatus(id) {
    /**
     * validating local device authentication
     * to update todo status
     */
    validatingAuth(async () => {
      let newArray = [...todoList];
      let todo = newArray.find(todo => todo.id == id);
      todo.status = !todo.status;
      await AsyncStorage.setItem(
        SESSION_KEYS.todoList,
        JSON.stringify(newArray),
      ).then(() => {
        fetchTodoList();
      });
    });
  }

  async function validatingAuth(action) {
    const authValidation = await validateAuth();
    if (authValidation.success) {
      /**
       * if authentication got succeded
       * we will perform action
       * which recived as argument
       */
      action();
    } else {
      /**
       * error handling
       */
      if (authValidation.error === 'system_cancel') {
        return Alert.alert(
          'System Cancellation',
          'Authentication was cancelled by System',
        );
      }
      if (authValidation.error === 'user_cancel') {
        return Alert.alert(
          'User Cancellation',
          'Authentication was cancelled by User',
        );
      }
      if (authValidation.error === 'device_not_compatible') {
        return Alert.alert(
          'Device Compatibility',
          'Your device is not compatible',
        );
      }
      return Alert.alert('Error', authValidation.error);
    }
  }

  return (
    <SafeAreaView>
      <AppHeader
        title={'Todo List'}
        showAdd
        showRefresh
        onRefersh={onRefersh}
      />
      <FlatList
        data={todoList}
        keyExtractor={item => item.id}
        style={styles.todoList}
        renderItem={({item}) => {
          const {id, name, description, status} = item;
          return (
            <View style={styles.listItem}>
              <View style={mLeft10}>
                <View style={styles.listRow}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.id}>{`Task #${id}`}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
              </View>
              <View
                style={[
                  styles.statusBg,
                  {
                    backgroundColor: status
                      ? COLORS.activeStatus
                      : COLORS.pendingStatus,
                  },
                ]}
              />
              <View style={styles.listButtons}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push(ROUTE_NAMES.Add, {todoItem: item})
                  }>
                  <Image
                    style={styles.listIcon}
                    source={require('../assets/images/icons/edit.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Confirmation',
                      'Would you like to delete todo?',
                      [
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => deleteTodo(id)},
                      ],
                    );
                  }}>
                  <Image
                    style={styles.listIcon}
                    source={require('../assets/images/icons/delete.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Update Status',
                      'Would you like to change todo status?',
                      [
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => updateStatus(id)},
                      ],
                    );
                  }}>
                  <Image
                    style={styles.listIcon}
                    source={
                      status
                        ? require('../assets/images/icons/checked.png')
                        : require('../assets/images/icons/unchecked.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: COLORS.listItemBgColor,
    borderColor: COLORS.listItemBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  listIcon: {width: 24, height: 24, marginHorizontal: 5},
  statusBg: {
    width: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  description: {color: COLORS.descTxtColor, fontSize: FONT_SIZES.small},
  id: {
    color: COLORS.black,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.black,
    fontSize: FONT_SIZES.normal,
    fontWeight: '400',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoList: {
    marginHorizontal: 15,
    marginTop: '5%',
    height: '100%',
  },
  listButtons: {flexDirection: 'row', alignSelf: 'flex-end'},
});
