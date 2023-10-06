import {useNavigationContainerRef} from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import {Platform} from 'react-native';

/**
 *
 * @param {*} length
 * @returns
 * random string
 * which generated in defined length
 */
const randomString = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

/**
 *
 * @returns
 * its a common function
 * to perform local device authentication
 * in the app.
 * it returns response or error
 */
const validateAuth = async () => {
  /**
   * check device compatability
   */
  const deviceCompatibility = await LocalAuthentication.hasHardwareAsync();
  if (deviceCompatibility) {
    try {
      /**
       * Local device authentication
       * based upon device platform
       */
      if (Platform.OS === 'ios') {
        let result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Please authenticate here',
        });
        return result;
      } else {
        let result = await LocalAuthentication.authenticateAsync({
          cancelLabel: 'Cancel',
          promptMessage: 'Please authenticate here',
        });
        return result;
      }
    } catch (err) {
      return {
        error: err,
        success: false,
      };
    }
  } else {
    return {
      error: 'device_not_compatible',
      success: false,
    };
  }
};

/**
 * using this common function
 * we will reset stack and
 * navigate to new screen
 */
function resetPush(navigation, routeName) {
  navigation.reset({
    index: 0,
    routes: [{name: routeName}],
  });
}

export {randomString, validateAuth, resetPush};
