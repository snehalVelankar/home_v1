import AsyncStorage from '@react-native-async-storage/async-storage';

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
import {Item} from 'native-base';

const read_store_async = async (event, userdata) => {
  const storedValue = await AsyncStorage.getItem('user_config');
  let storedValue_str = JSON.stringify(storedValue);
  let userdata_str = JSON.stringify(userdata);
  let userdata_obj = JSON.parse(userdata_str);
  let storedValue_obj = JSON.parse(storedValue);

  switch (event) {
    case 'owner_event':
      if (storedValue_obj == null) {
        await AsyncStorage.setItem('user_config', userdata);
        return 'Data is updated';
      } else {
        // storedValue_obj.owner[0] = userdata.slice(0);
        console.log('updated owner', userdata);
        await AsyncStorage.setItem('user_config', JSON.stringify(userdata));
        return 'Data is updated';
      }
      break;

    case 'location_event':
      if (storedValue_obj.location.length <= 0) {
        storedValue_obj.location.push(userdata_obj);

        let string_data = JSON.stringify(storedValue_obj);
        console.log('data===?', string_data);
        await AsyncStorage.setItem('user_config', string_data);
        return 'data is updated';
      } else {
        let loc_status = 0,
          loc_len = storedValue_obj.location.length;
        for (let x = 0; x < loc_len; x++) {
          if (userdata_obj == storedValue_obj.location[x]) {
            loc_status = 1;
            break;
          }
        }
        if (loc_status == 0) {
          storedValue_obj.location.push(userdata_obj);
          let string_data1 = JSON.stringify(storedValue_obj);
          console.log('data===?', string_data1);
          await AsyncStorage.setItem('user_config', string_data1);
          return 'data is updated';
        } else {
          loc_status = 0;
          return 'same data found ';
        }
      }

      break;

    case 'appliance_event':
      if (storedValue_obj.appliance.length <= 0) {
        storedValue_obj.appliance.push(userdata_obj);
        let string_data = JSON.stringify(storedValue_obj);
        await AsyncStorage.setItem('user_config', string_data);
        return 'data is updated';
      } else {
        let app_status = 0,
          app_len = storedValue_obj.appliance.length;
        for (let x = 0; x < app_len; x++) {
          if (userdata_obj == storedValue_obj.appliance[x]) {
            app_status = 1;
            break;
          }
        }

        if (app_status == 0) {
          storedValue_obj.appliance.push(userdata_obj);
          let string_data1 = JSON.stringify(storedValue_obj);
          await AsyncStorage.setItem('user_config', string_data1);
          return 'data is updated';
        } else {
          console.log('same data found ');
          app_status = 0;
          return 'same data found ';
        }
      }

      break;
    case 'binding_event':
      console.log('binding length', storedValue_obj.Binding.length);
      if (storedValue_obj.Binding.length <= 0) {
        storedValue_obj.Binding.push(userdata_obj);
        let string_data = JSON.stringify(storedValue_obj);
        await AsyncStorage.setItem('user_config', string_data);
        return 'data is updated';
      } else {
        let bind_status = 0,
          bind_len = storedValue_obj.Binding.length;
        for (let x = 0; x < bind_len; x++) {
          if (userdata_obj == storedValue_obj.Binding[x]) {
            bind_status = 1;
            break;
          }
        }

        if (bind_status == 0) {
          storedValue_obj.Binding.push(userdata_obj);
          let string_data1 = JSON.stringify(storedValue_obj);
          await AsyncStorage.setItem('user_config', string_data1);
          return 'data is updated';
        } else {
          console.log('same data found ');
          bind_status = 0;
          return 'same data found ';
        }
      }

      break;
  }
};

const check_password = async pass => {
  const async_data_owner = await AsyncStorage.getItem('user_config');

  var result = '';
  if (async_data_owner) {
    let read = JSON.parse(async_data_owner);

    if (pass == read.owner.owner_password) {
      result = 'valid';
    } else {
      result = 'invalid';
    }

    return result;
  } else {
    result = 'valid';

    return result;
  }
};

const delete_registrations = async (event, userdata) => {
  const storedValue = await AsyncStorage.getItem('user_config');
  let storedValue_str = JSON.stringify(storedValue);
  let userdata_str = JSON.stringify(userdata);
  let userdata_obj = JSON.parse(userdata_str);
  let storedValue_obj = JSON.parse(storedValue);

  switch (event) {
    case 'location_event':
      for (var i = 0; i < storedValue_obj.location.length; i++) {
        if (storedValue_obj.location[i] == userdata) {
          storedValue_obj.location.splice(
            storedValue_obj.location.indexOf(userdata),
            1,
          );
          i--;
        }
      }
      if (storedValue_obj.Binding.length > 0) {
        console.log(storedValue_obj.Binding.length);
        const result = storedValue_obj.Binding.filter(
          s => !s.includes(userdata),
        );
        storedValue_obj.Binding = result.slice(0);
      }
      console.log('userdata', userdata);

      console.log('value after deleting location', storedValue_obj.location);
      console.log('value after deleting  binding', storedValue_obj.Binding);
      let string_data1 = JSON.stringify(storedValue_obj);
      await AsyncStorage.setItem('user_config', string_data1);
      return 'succesfully deleted';

      // const item = 'hall';
      // var arr = [
      //   'jack_hall_light',
      //   'jack_hall_fan',
      //   'jack_hall_bulb',
      //   'jack_kitchen_fan',
      //   'jack_kitchen_light',
      // ];

      // const result = storedValue_obj.Binding.filter(
      //   s => !s.includes(userdata),
      // );

      break;

    case 'appliance_event':
      for (var i = 0; i < storedValue_obj.appliance.length; i++) {
        if (storedValue_obj.appliance[i] == userdata) {
          storedValue_obj.appliance.splice(
            storedValue_obj.appliance.indexOf(userdata),
            1,
          );
          i--;
        }
      }
      if (storedValue_obj.Binding.length > 0) {
        const result = storedValue_obj.Binding.filter(
          s => !s.includes(userdata),
        );
        storedValue_obj.Binding = result.slice(0);
      }

      //       storedValue_obj.Binding =  ['snehal_ligh_kitchen','snehal_ligh_hall','snehal_fan_kitchen']
      //       userdata = light
      //       var res = storedValue_obj.Binding.filter( item=>!item.includes('light'))
      // res = ['snehal_fan_kitchen']
      // storedValue_obj.Binding =res.splice(0)

      // storedValue_obj.Binding=['snehal_fan_kitchen']
      console.log('userdata', userdata);
      console.log('value after deleting Appliance', storedValue_obj.appliance);
      console.log('value after deleting  binding', storedValue_obj.Binding);
      string_data1 = JSON.stringify(storedValue_obj);
      await AsyncStorage.setItem('user_config', string_data1);
      return 'succesfully deleted';
      break;
    case 'binding_event':
      for (var i = 0; i < storedValue_obj.Binding.length; i++) {
        if (storedValue_obj.Binding[i] == userdata) {
          storedValue_obj.Binding.splice(
            storedValue_obj.Binding.indexOf(userdata),
            1,
          );
        }
      }
      console.log('value after deleting Binding', storedValue_obj.Binding);
      string_data1 = JSON.stringify(storedValue_obj);
      await AsyncStorage.setItem('user_config', string_data1);
      return 'succesfully deleted';
      break;
  }

  // const storedValue = await AsyncStorage.getItem('user_config');
  // let storedValue_obj = JSON.parse(storedValue);

  // console.log('entered loop');
  // // let val = storedValue_obj.Binding[i];
  // console.log('storedValue_obj.Binding[i]', storedValue_obj.Binding);

  // // val.includes('fvef_\');
  // console.log('resilt', result);
  // let xyz = result.includes(userdata);
  // console.log('xyz', xyz);
  // console.log('storedValue_obj.Binding[i]', storedValue_obj.Binding[i][1]);
  // if (val == true) {
  //   storedValue_obj.Binding.pop(storedValue_obj.Binding[i]);
  // } else {
  //   console.log('false');
  // }

  // return 'something';
};

export {check_password, read_store_async, delete_registrations};

// const storedValue = await AsyncStorage.getItem('user_config');
// let storedValue_obj = JSON.parse(storedValue);

// console.log('entered loop');
// // let val = storedValue_obj.Binding[i];
// console.log('storedValue_obj.Binding[i]', storedValue_obj.Binding);
// const result = storedValue_obj.Binding.filter(s => !s.includes(userdata));

// // val.includes('fvef_\');
// console.log('resilt', result);
// let xyz = result.includes(userdata);
// console.log('xyz', xyz);
// console.log('storedValue_obj.Binding[i]', storedValue_obj.Binding[i][1]);
// if (val == true) {
//   storedValue_obj.Binding.pop(storedValue_obj.Binding[i]);
// } else {
//   console.log('false');
// }

// return 'something';
