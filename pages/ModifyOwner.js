import React, {useState, createRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Modal,
  Pressable,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {check_password, read_store_async} from './Functions';
import {useFocusEffect} from '@react-navigation/native';
const ModifyOwner = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [OwnerName, setOwnerName] = useState('');
  const [password, setpassword] = useState('');
  const [MailId, setMailId] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Property_name, setProperty_name] = useState('');
  const [Street, setStreet] = useState('');
  const [Area, setArea] = useState('');
  const [State, setState] = useState('');
  const [country, setcountry] = useState('');
  const [Door_Number, setDoor_Number] = useState('');
  const [owner, setowner] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(value);
      //console.log('async data loc:', async_data);
      // console.log('async data app:', async_data.appliance);
      setowner(async_data.owner);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmitPress = async () => {
    setModalVisible(!modalVisible);
    if (
      !OwnerName ||
      !password ||
      !MailId ||
      !PhoneNumber ||
      !Property_name ||
      !Area ||
      !State ||
      !country ||
      !Street ||
      !Door_Number
    ) {
      alert('Please fill all the fields');
      return;
    }

    let async_data_raw = await AsyncStorage.getItem('user_config');
    let async_data = JSON.parse(async_data_raw);
    console.log('async_data: ', async_data);
    async_data.owner.owner_name = OwnerName;
    async_data.owner.owner_password = password;
    async_data.owner.owner_MailId = MailId;
    async_data.owner.owner_PhoneNumber = PhoneNumber;
    async_data.owner.owner_Property_name = Property_name;
    async_data.owner.owner_Area = Area;
    async_data.owner.owner_State = State;
    async_data.owner.owner_country = country;
    async_data.owner.owner_Street = Street;
    async_data.owner.owner_Door_Number = Door_Number;

    console.log('async_data after population: ', async_data);

    let mod = await read_store_async('owner_event', async_data);
    if (mod == 'Data is updated') {
      Alert.alert('success');
    }
  };

  return (
    <ScrollView>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
        Owner registration Screen
      </Text>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
          }}
          placeholder="Owner Name" //{owner}
          onChangeText={OwnerName => setOwnerName(OwnerName)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="Enter password"
          onChangeText={password => setpassword(password)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
          }}
          placeholder="Mail Id"
          onChangeText={MailId => setMailId(MailId)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,

          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
          }}
          placeholder="Phone Number"
          onChangeText={PhoneNumber => setPhoneNumber(PhoneNumber)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="Property_name"
          onChangeText={Property_name => setProperty_name(Property_name)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="City/Town/Village"
          onChangeText={Area => setArea(Area)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="State"
          onChangeText={State => setState(State)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="Country"
          onChangeText={country => setcountry(country)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="Street"
          onChangeText={Street => setStreet(Street)}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 2,
            padding: 10,
          }}
          placeholder="Apartment Number/House Number"
          onChangeText={Door_Number => setDoor_Number(Door_Number)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmitPress}>
        <Text style={styles.textStyle}>SUBMIT</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ModifyOwner;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    width: 400,
    marginTop: 16,
    justifyContent: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
