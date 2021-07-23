import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  useEffect,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  check_password,
  read_store_async,
  delete_registrations,
} from './Functions';

import {
  Left,
  Text,
  Button,
  Icon,
  Right,
  CheckBox,
  Title,
  H1,
  Spinner,
} from 'native-base';

const filedata = require('./Master.json');
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {useFocusEffect} from '@react-navigation/native';
const Binding = ({navigation}) => {
  const [asyncloc, setasyncloc] = useState([]);
  const [asyncapp, setasyncapp] = useState([]);
  const [location, setlocation] = useState([]);
  const [owner, setowner] = useState([]);
  const [appliance, setappliance] = useState([]);
  const [asyncbind, setasyncbind] = useState([]);
  const [model, setmodel] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(value);
      //  console.log('async data loc:', async_data);
      // console.log('async data app:', async_data.appliance);
      setowner(async_data.owner.owner_name);
      setasyncloc(async_data.location);
      setasyncapp(async_data.appliance);
      setasyncbind(async_data.Binding);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledeletePress = item => {
    console.log('chosen item to delete', item);

    const store = async userdata => {
      let bind_del = await delete_registrations('binding_event', userdata);
      if (bind_del == 'succesfully deleted') {
        navigation.navigate('DummyScreen', {
          paramKey: 'Binding_delete',
        });

        // Alert.alert(
        //   'Success',
        //   'deletion',
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('SecondPage'),
        //     },
        //   ],
        //   {cancelable: false},
        // );
      }
    };

    Alert.alert(
      'Are you sure ',
      ' you want  to delete',
      [
        {
          text: 'Ok',

          onPress: () => store(item),
        },
        {
          text: 'cancel',

          onPress: () => console.log('cancel pressed'),
        },
      ],
      {cancelable: true},
    );

    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      console.log('data read from async >>', value);
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };
  };

  const handleSubmitPress = async () => {
    if (!location) {
      alert('Please enter location');
      return;
    }
    if (!appliance) {
      alert('Please enter appliance');
      return;
    }
    if (!model) {
      alert('Please enter model');
      return;
    }
    let app1 = JSON.parse(appliance);
    let loc1 = JSON.parse(location);

    let app2 = JSON.stringify(app1);
    let loc2 = JSON.stringify(loc1);
    let mod2 = JSON.stringify(model);
    let own1 = JSON.stringify(owner);
    let binding =
      own1.toUpperCase() +
      '_' +
      loc2.toUpperCase() +
      '_' +
      app2.toUpperCase() +
      '_' +
      mod2.toUpperCase();

    console.log('binding', binding);

    let data2 = binding;
    if (data2 != null) {
      let bind_add = await read_store_async('binding_event', data2);
      if (bind_add == 'data is updated') {
        navigation.navigate('DummyScreen', {
          paramKey: 'Binding',
        });
        // Alert.alert(
        //   'Success',
        //   'Data is updated',
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('SecondPage'),
        //     },
        //   ],
        //   {cancelable: false},
        // );
      } else if (bind_add == 'same data found ') {
        navigation.navigate('DummyScreen', {
          paramKey: 'Binding_samedata',
        });
        // Alert.alert(
        //   'appliance name already present ',
        //   'please insert new appliance name',
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('SecondPage'),
        //     },
        //   ],
        //   {cancelable: false},
        // );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
      }}>
      <ModalDropdown
        textStyle={{
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
          alignItems: 'center',
        }}
        dropdownTextStyle={{fontSize: 30}}
        options={asyncloc}
        defaultValue={'select location'}
        onSelect={(idx, value) => setlocation(value)}></ModalDropdown>

      <ModalDropdown
        textStyle={{
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
          alignItems: 'center',
        }}
        dropdownTextStyle={{fontSize: 30}}
        options={asyncapp}
        defaultValue={'select appliance'}
        onSelect={(idx, value) => setappliance(value)}></ModalDropdown>
      {/* <ModalDropdown
        textStyle={{
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
          alignItems: 'center',
        }}
        dropdownTextStyle={{fontSize: 30}}
        options={filedata.model}
        defaultValue={'select model'}
        onSelect={(idx, value) => setmodel(value)}></ModalDropdown> */}

      <SearchableDropdown
        keyboardShouldPersistTaps="always"
        onTextChange={text => Alert.alert(text)}
        resetValue={false}
        onItemSelect={item => setmodel(item.name)}
        containerStyle={{padding: 5}}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#FAF7F6',
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        itemTextStyle={{
          color: '#222',
        }}
        itemsContainerStyle={{
          maxHeight: '60%',
        }}
        items={filedata.model}
        defaultIndex={2}
        placeholder="select model"
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmitPress()}>
        <Text>Add Binding</Text>
      </TouchableOpacity>

      <FlatList
        keyExtractor={(item, id) => id}
        data={asyncbind}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              height: 40,
              marginTop: 20,
              margin: 10,
            }}>
            <Text
              style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: 'beige',
                bottom: 0,
                fontSize: 14,
              }}>
              {item}
            </Text>
            <Left>
              <Button
                onPress={() => handledeletePress(item)}
                style={styles.actionButton}
                danger>
                <Icon name="trash" active />
              </Button>
            </Left>
          </View>
        )}
        ItemSeparatorComponent={() => {
          return <View style={styles.separatorLine}></View>;
        }}
      />
    </View>
  );
};

export default Binding;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7fff00',
    padding: 10,
    width: 300,
    marginTop: 16,
  },

  actionButton: {
    marginLeft: 250,
  },
  actionButton1: {
    marginLeft: 150,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
});
