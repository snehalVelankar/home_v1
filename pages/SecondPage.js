import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check_password} from './Functions';
import Binding from './Binding';

const SecondPage = ({navigation}) => {
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [view, setview] = useState(false);
  const [view1, setview1] = useState(false);
  const [view2, setview2] = useState(false);
  const [view3, setview3] = useState(false);

  function close(isShow) {
    setisDialogVisible(isShow);

    navigation.navigate('FirstPage');
  }

  const sendInput = async (inputText, close) => {
    const read1 = await AsyncStorage.getItem('user_config');
    const async_raw1 = JSON.parse(read1);
    let val = await check_password(inputText);
    // console.log('val', val);
    if (val == 'valid') {
      setview(false);
      async_raw1.pwd_status = true;
      await AsyncStorage.setItem('user_config', JSON.stringify(async_raw1));
      setisDialogVisible(close);
    } else {
      Alert.alert(
        'Incorrect Credentials',
        'Enter valid password',
        [
          {
            text: 'Ok',

            onPress: () => setisDialogVisible(true),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const retrieve = async () => {
    const read = await AsyncStorage.getItem('user_config');
    const async_raw = JSON.parse(read);
    if (read == null) {
      setview(true);
    } else {
      if (async_raw.pwd_status == false) {
        setisDialogVisible(true);
      }
      const obj = JSON.parse(read);
      let own1 = obj.owner;
      let own2 = JSON.stringify(own1);
      let loc1 = obj.location;
      let loc2 = JSON.stringify(loc1);
      let app1 = obj.appliance;
      let app2 = JSON.stringify(app1);
      // console.log(own1, loc1, app1);

      console.log(own2.length, loc2.length, app2.length);
      if (own2.length) {
        // console.log('owner registered');
        setview1(true);
        setview(false);

        if (loc2.length > 3) {
          // console.log('owner and loc registered');
          setview2(true);
          setview1(false);
          setview(false);

          if (app2.length > 3) {
            // console.log('owner and loc and appliance registered');
            setview3(true);
            setview2(false);
            setview1(false);
            setview(false);
          }
        }
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, []),
  );

  if (view) {
    return (
      <View style={styles.container}>
        <Text>register owner</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OwnerRegistration')}>
          <Text>Add Owner</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (view1) {
    return (
      <View style={styles.container}>
        <Text>Register Location</Text>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={'VERIFICATION'}
          message={'Enter Password'}
          submitInput={inputText => {
            sendInput(inputText, false);
          }}
          closeDialog={() => {
            close(false);
          }}></DialogInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ModifyOwner')}>
          <Text>Modify Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationRegistration')}>
          <Text>Location Registration</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (view2) {
    return (
      <View style={styles.container}>
        <Text>Register Appliance</Text>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={'VERIFICATION'}
          message={'Enter Password'}
          submitInput={inputText => {
            sendInput(inputText, false);
          }}
          closeDialog={() => {
            close(false);
          }}></DialogInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ModifyOwner')}>
          <Text>Modify Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationRegistration')}>
          <Text> Modify Location </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ApplianceRegistration')}>
          <Text>Appliance Registration</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (view3) {
    return (
      <View style={styles.container}>
        <Text>Register Binding</Text>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={'VERIFICATION'}
          message={'Enter Password'}
          submitInput={inputText => {
            sendInput(inputText, false);
          }}
          closeDialog={() => {
            close(false);
          }}></DialogInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ModifyOwner')}>
          <Text>Modify Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationRegistration')}>
          <Text>Modify Location </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ApplianceRegistration')}>
          <Text> Modify Appliance </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Binding')}>
          <Text>Binding</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'VERIFICATION'}
        message={'Enter Password'}
        submitInput={inputText => {
          sendInput(inputText, false);
        }}
        closeDialog={() => {
          close(false);
        }}></DialogInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default SecondPage;
