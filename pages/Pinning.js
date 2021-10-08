var CryptoJS = require('crypto-js');
import React, {useState, createRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Left,
  Button,
  Icon,
  Right,
  Title,
  H1,
  Spinner,
  Fab,
} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Feather from 'react-native-vector-icons/Feather';

import MultiSelect from 'react-native-multiple-select';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});
import TcpSocket from 'react-native-tcp-socket';
const Pinning = ({navigation}) => {
  const [selectedloc, setselectedloc] = useState([]);
  const [selectloc, setselectloc] = useState([]);
  const [selectedappliance, setselectedappliance] = useState([]);
  const [selectappliance, setselectappliance] = useState([]);
  const [image, setimage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, []),
  );
  //after location is chosen
  const selectedlocation = selectedItems => {
    console.log(selectedItems.toString());
    setselectloc(selectedItems);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT appliance FROM Binding_Reg where location=? and paired_unpaired=? ',
        [selectedItems.toString(), 'unpaired'],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log('appliance', temp);
          setselectappliance(temp);
          // setasyncapp(temp);
        },
      );
    });
  };

  //after appliance is chosen
  const appliance = selectedItems => {
    console.log(selectedItems.toString());
    setselectedappliance(selectedItems);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT lOC_images FROM  Location_Reg where Location=? ',
        [selectloc.toString()],
        (tx, results) => {
          var img = results.rows.item(0);

          setimage(img.lOC_images);
        },
        (tx, error) => {
          console.log(error);
        },
      );
    });
  };

  async function retrieve() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT DISTINCT location FROM Binding_Reg',
        [],
        (tx, results) => {
          var temp = [];
          for (let j = 0; j < results.rows.length; ++j)
            temp.push(results.rows.item(j));
          setselectedloc(temp);
        },
      );
    });
  }

  return (
    <>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'orange',
        }}>
        <Button transparent onPress={() => {}}>
          <Icon
            name="map-pin"
            type="Feather"
            style={{fontSize: 30, color: 'green'}}
          />
        </Button>
      </View>
      <View>
        <MultiSelect
          items={selectedloc}
          single={true}
          uniqueKey="location"
          onSelectedItemsChange={selectedlocation}
          selectedItems={selectloc}
          selectText="Pick location"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={text => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="location"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
        <MultiSelect
          items={selectappliance}
          single={true}
          uniqueKey="appliance"
          onSelectedItemsChange={appliance}
          selectedItems={selectedappliance}
          selectText="Pick Appliance"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={text => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="appliance"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
        {image ? <Image style={styles.image} source={{uri: image}} /> : <></>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#008080`,
  },

  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    fontWeight: 'bold',
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
export default Pinning;
