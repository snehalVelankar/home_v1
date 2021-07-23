import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useEffect,
} from 'react-native';

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

import ModalDropdown from 'react-native-modal-dropdown';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadOptions} from '@babel/core';

import {
  //check_password,
  read_store_async,
  delete_registrations,
} from './Functions';

const LocationRegistration = ({navigation}) => {
  const [LocationName, setLocationName] = useState(''); //text input field loc
  const [asyncloc, setasyncloc] = useState([]); //to view dropodown values
  const [drop_loc, setdrop_loc] = useState(''); //to capture dropdown vals

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
      setasyncloc(async_data.location);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledeletePress = item => {
    console.log('chosen item to delete', item);

    const store = async userdata => {
      let loc_del = await delete_registrations('location_event', userdata);

      if (loc_del == 'succesfully deleted') {
        navigation.navigate('DummyScreen',{
          paramKey: "LocationRegistration_delete",
        })

      //   Alert.alert(
      //     'Success',
      //     'deletion',
      //     [
      //       {
      //         text: 'Ok',
      //         onPress: () => navigation.navigate('SecondPage'),
      //       },
      //     ],

      //     {cancelable: false},
      //   );
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
  };

  const handleSubmitPress = async () => {
    if (!LocationName) {
      alert('Please enter location');
      return;
    }
    let data2 = JSON.stringify(LocationName.toUpperCase());
    if (data2 != null) {
      let loc_add = await read_store_async('location_event', data2);
      if (loc_add == 'data is updated') {
        navigation.navigate('DummyScreen',{
          paramKey: "LocationRegistration",
        })

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
      } else if (loc_add == 'same data found ') {
        navigation.navigate('DummyScreen',{
          paramKey: "LocationRegistration_samedata",
        })
        // Alert.alert(
        //   'location name already present ',
        //   'please insert new location name',
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('LocationRegistration'),
        //     },
        //   ],

        //   {cancelable: false},
        // );
      }
    }
    return;
  };

  return (
    <>
      <View
        style={{
          flex: 10,
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
          placeholder=" Enter Location name eg: Hall,dining,Kitchen...etc"
          onChangeText={LocationName => setLocationName(LocationName)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmitPress(handleSubmitPress + 1)}>
          <Text>Add location</Text>
        </TouchableOpacity>

        {/* <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncloc}
          defaultValue={'Location List'}
          onSelect={(idx, value) => setdrop_loc(value)}></ModalDropdown>
      </View> */}

        <FlatList
          keyExtractor={(item, id) => id}
          data={asyncloc}
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
    </>
  );
};

export default LocationRegistration;

const styles = StyleSheet.create({
  actionButton: {
    marginLeft: 200,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#7fff00',
    padding: 10,
    width: 300,
    marginTop: 16,
  },

  separatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
  dropdown_3: {
    marginVertical: 20,
    marginHorizontal: 16,
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 100,
    height: 100,
    flexGrow: 100,
  },
});

/*
index_ststus=0
index=0

 binding_data= [amit_hall_fan_bajaj,
  amit_hall_bulb1_bajaj,
  amit_hall_bulb2_bajaj,
  rahul_bedroom_bulb_led,
  ]

  for loop{
    if (binding_data==LA){
     index_ststus=1
     break
    }
    index++
  }

  if(index_sttus ==1){
    pop(bindding_data[index])
  }

  index=2
  index_ststus=1
*/
