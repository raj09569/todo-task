import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import {useState} from 'react';
import {
  COLORS,
  FONT_SIZES,
  ROUTE_NAMES,
  SESSION_KEYS,
} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {randomString, resetPush} from '../../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {validateAuth} from '../../utils/functions';

export default function Add({route}) {
  const params = route?.params;

  /**
   * Sample Todo list which i am using
   * Task Number
   * Task name
   * Task description
   * Task status default will be true
   */
  const [name, setName] = useState(params?.todoItem?.name);
  const [description, setDescription] = useState(params?.todoItem?.description);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  function addTodo() {
    if (!name && name == '') {
      setErrorMessage('Please enter Todo Name');
      return;
    }
    if (!description && description == '') {
      setErrorMessage('Please enter Todo Description');
      return;
    }
    /**
     * validating local device authentication
     * to create todo
     */
    validatingAuth(async () => {
      let previousTodos = await AsyncStorage.getItem(SESSION_KEYS.todoList);
      if (previousTodos) {
        previousTodos = JSON.parse(previousTodos);
        previousTodos.push({
          id: randomString(4),
          name: name,
          description: description,
          status: false,
        });
        await AsyncStorage.setItem(
          SESSION_KEYS.todoList,
          JSON.stringify(previousTodos),
        )
          .then(res => resetPush(navigation, ROUTE_NAMES.List))
          .catch(err => setErrorMessage(err));
      } else {
        const newTodos = [
          {
            id: randomString(4),
            name: name,
            description: description,
            status: false,
          },
        ];
        await AsyncStorage.setItem(
          SESSION_KEYS.todoList,
          JSON.stringify(newTodos),
        )
          .then(res => resetPush(navigation, ROUTE_NAMES.List))
          .catch(err => setErrorMessage(err));
      }
    });
  }

  function updateTodo() {
    if (params?.todoItem) {
      const todoItem = params?.todoItem;
      const {id} = todoItem;
      if (!name && name == '') {
        setErrorMessage('Please enter Todo Name');
        return;
      }
      if (!description && description == '') {
        setErrorMessage('Please enter Todo Description');
        return;
      }
      /**
       * validating local device authentication
       * to update todo
       */
      validatingAuth(async () => {
        let previousTodos = await AsyncStorage.getItem(SESSION_KEYS.todoList);
        if (previousTodos) {
          previousTodos = JSON.parse(previousTodos);
          let previousTodo = previousTodos.find(todo => todo.id == id);
          previousTodo.name = name;
          previousTodo.description = description;
          await AsyncStorage.setItem(
            SESSION_KEYS.todoList,
            JSON.stringify(previousTodos),
          )
            .then(res => resetPush(navigation, ROUTE_NAMES.List))
            .catch(err => setErrorMessage(err));
        }
      });
    }
  }

  async function validatingAuth(action) {
    const authValidation = await validateAuth();
    if (authValidation) {
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
    } else {
      return Alert.alert('Error', 'Something went wrong');
    }
  }

  return (
    <SafeAreaView>
      <AppHeader title={'Add Todo'} showBack />
      <View style={styles.form}>
        {errorMessage && (
          <View style={styles.formError}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Name</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Name"
            value={name}
            maxLength={20}
            placeholderTextColor={COLORS.black}
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            multiline
            style={styles.formInput}
            placeholder="Description"
            numberOfLines={3}
            value={description}
            placeholderTextColor={COLORS.black}
            maxLength={150}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View style={styles.btnContainer}>
          {params?.todoItem ? (
            <TouchableOpacity onPress={updateTodo}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Update</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={addTodo}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: COLORS.formGroup,
    marginTop: '8%',
    marginHorizontal: '3%',
  },
  formGroup: {
    padding: 10,
    backgroundColor: COLORS.formBgColor,
    margin: 10,
    borderRadius: 10,
  },
  formLabel: {
    fontSize: FONT_SIZES.normal,
    color: COLORS.descTxtColor,
    marginBottom: 5,
    padding: 3,
    fontWeight: '400',
  },
  formInput: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    color: COLORS.black,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: COLORS.btnBgColor,
    borderColor: COLORS.btnBorderColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: Dimensions.get('window').width / 1.2,
  },
  btnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.normal,
    fontWeight: 'bold',
  },
  formError: {
    backgroundColor: COLORS.errorColor,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  errorText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small,
  },
});
