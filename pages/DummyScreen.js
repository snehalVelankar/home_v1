import React, {useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

const DummyScreen = ({navigation, route}) => {
  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    if (route.params.paramKey == 'LocationRegistration') {
      Alert.alert(
        'Success',
        'Data is updated',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('LocationRegistration'),
          },
        ],

        {cancelable: false},
      );
    } else if (route.params.paramKey == 'LocationRegistration_samedata') {
      Alert.alert(
        'location name already present ',
        'please insert new location name',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('LocationRegistration'),
          },
        ],

        {cancelable: false},
      );
    } else if (route.params.paramKey == 'LocationRegistration_delete') {
      Alert.alert(
        'Success',
        'deletion',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('LocationRegistration'),
          },
        ],

        {cancelable: false},
      );
    } 
    else if (route.params.paramKey == 'ApplianceRegistration') {
      Alert.alert(
        'Success',
        'Data is updated',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('ApplianceRegistration'),
          },
        ],

        {cancelable: false},
      );
    } else if (route.params.paramKey == 'ApplianceRegistration_samedata') {
      Alert.alert(
        'location name already present ',
        'please insert new location name',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('ApplianceRegistration'),
          },
        ],

        {cancelable: false},
      );
  } else if (route.params.paramKey == 'ApplianceRegistration_delete') {
    Alert.alert(
      'Success',
      'deletion',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('ApplianceRegistration'),
        },
      ],

      {cancelable: false},
    );
  } 
  else if (route.params.paramKey == 'Binding') {
    Alert.alert(
      'Success',
      'Data is updated',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Binding'),
        },
      ],

      {cancelable: false},
    );
  } else if (route.params.paramKey == 'Binding_samedata') {
    Alert.alert(
      'location name already present ',
      'please insert new location name',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Binding'),
        },
      ],

      {cancelable: false},
    );
} else if (route.params.paramKey == 'Binding_delete') {
  Alert.alert(
    'Success',
    'deletion',
    [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Binding'),
      },
    ],

    {cancelable: false},
  );
} 
}

  return <></>;
};

export default DummyScreen;

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
