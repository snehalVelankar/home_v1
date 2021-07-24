import React, {useState, createRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FirstPage = ({navigation}) => {
   useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, []),
  );
 async function retrieve() {
    const read1 = await AsyncStorage.getItem('user_config');
    if(read1){
const async_raw1 = JSON.parse(read1);
     async_raw1.pwd_status = false
      await AsyncStorage.setItem('user_config', JSON.stringify(async_raw1));

    }
    
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SecondPage')
            }></TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}></Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default FirstPage ;
