import React, {useState, createRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Left,
  Text,
  Button,
  Icon,
  Right,
  CheckBox,
  Title,
  H1,
  Spinner,
  Fab,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import PanoramaView from "@lightbase/react-native-panorama-view";
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

//import CheckBox from "@react-native-community/checkbox";
const PendingView = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 30,
          color: 'red',
        }}>
        loading...
      </Text>
    </View>
  );
};

const ApplianceRegistration = ({navigation}) => {
  const [showmodal, setshowmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [DeviceName, setDeviceName] = useState('');

  const [Device, setDevice] = useState('');
  const [asyncapp, setasyncapp] = useState([]);
  const [drop_app, setdrop_app] = useState('');
  //to capture dropdown vals
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedapp, setselectedapp] = useState('');
  const [editedapp, seteditedapp] = useState('');
  const [image, setimage] = useState(null);
  const [capture, setcapture] = useState(false);
  const [pressed, setpressed] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );
  var touchprops = {
    activeOpacity: 1,
    underlayColor: 'blue', // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: pressed ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setpressed(false),
    onShowUnderlay: () => setpressed(true),
    onPress: () => console.log('HELLO'),
  };
  const retrieveData = async () => {
    try {
      // const value = await AsyncStorage.getItem('user_config');
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Appliance_Reg', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setasyncapp(temp);
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledeletePress = item => {
    console.log('chosen item to delete', item);

    function deleteappliance(userdata) {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  Appliance_Reg where Appliance=?',
          [userdata],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              navigation.navigate('DummyScreen', {
                paramKey: 'ApplianceRegistration_delete',
              });
            }
          },
          (tx, error) => {
            console.log('error', error);
          },
        );
      });

      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  Binding_Reg where appliance=?',
          [userdata],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('deleted from binding table');
            }
          },
          (tx, error) => {
            console.log('error', error);
          },
        );
      });
    }

    Alert.alert(
      'Are you sure you want  to delete',
      item,
      [
        {
          text: 'Ok',

          onPress: () => deleteappliance(item),
        },
        {
          text: 'cancel',

          onPress: () => console.log('cancel pressed'),
        },
      ],
      {cancelable: true},
    );
    setselectedapp('');
  };

  const handleSubmitPress = async () => {
    if (!Device) {
      alert('Please enter Device');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        `INSERT INTO Appliance_Reg (Appliance,binded_unbinded)
                 VALUES (?,?)`,
        [Device.toString().toUpperCase(), 'unbinded'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            navigation.navigate('DummyScreen', {
              paramKey: 'ApplianceRegistration',
            });
          }
        },
        (tx, error) => {
          navigation.navigate('DummyScreen', {
            paramKey: 'ApplianceRegistration_samedata',
          });
        },
      );
    });
  };

  function handleeditPress() {
    if (!editedapp) {
      alert('please fill all fields ');
      return;
    }
    console.log('old Appliance', selectedapp);
    console.log('new Appliance', editedapp.toUpperCase());
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Appliance_Reg SET Appliance=? where Appliance=?;',
        [editedapp.toUpperCase(), selectedapp],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            updatebinding(editedapp.toUpperCase(), selectedapp);
            navigation.navigate('DummyScreen', {
              paramKey: 'ApplianceRegistration',
            });
          }
        },
        (tx, error) => {
          navigation.navigate('DummyScreen', {
            paramKey: 'ApplianceRegistration_samedata',
          });
        },
      );
    });
    setselectedapp('');
  }

  function updatebinding(editedapp, selectedapp) {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Binding_Reg SET appliance=? where appliance=?;',
        [editedapp, selectedapp],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('updated binding table');
          }
        },
      );
    });
  }
  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false, doNotSave: false};
      const data = await camera.takePictureAsync(options);
      console.log(data);
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE Appliance_Reg SET app_images=? where Appliance=?',
          [data.uri, selectedapp],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              navigation.navigate('DummyScreen', {
                paramKey: 'ApplianceRegistration',
              });
            }
          },
        );
      });
      //  setimage(data.uri);
      setcapture(false);
    } catch (error) {
      console.log(error);
    }
  };

  function dataURItoBlob(dataURI) {
    console.log('SS', dataURI);
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], {type: mimeString});
    return blob;
  }
  

  return (
    <>
      {capture == true ? (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.off}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          getCameraIds={true}
       
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to view camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to view audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;

            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => takePicture(camera)}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
              

            );
          }}
        </RNCamera>
      ) : (
        <>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'orange',
            }}>
            <Button
              transparent
              onPress={() => {
                setshowmodal(!showmodal);
              }}>
              <Icon name="add-outline" style={{fontSize: 30, color: 'black'}} />
            </Button>
            <Button
              transparent
              onPress={() => {
                seteditmodal(!editmodal);
              }}>
              <Icon
                name="edit"
                type="Feather"
                style={{fontSize: 30, color: 'blue'}}
              />
            </Button>
            <Button transparent onPress={() => setcapture(true)}>
              <Icon
                name="camera"
                type="Feather"
                style={{fontSize: 30, color: 'green'}}
              />
               
            </Button>
            <Button transparent onPress={() => handledeletePress(selectedapp)}>
              <Icon name="trash" style={{fontSize: 30, color: 'red'}} />
            </Button>
          </View>
          <View
            style={{
              flex: 10,
              marginTop: 10,
              marginBottom: 65,
              marginLeft: 10,
              marginRight: 10,
              margin: 10,
            }}>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={showmodal}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <Button
                  transparent
                  onPress={() => {
                    setshowmodal(!showmodal);
                  }}>
                  <Icon name="close" style={{fontSize: 30, color: '#05375a'}} />
                </Button>
                <Text style={styles.text_footer}>Enter Appliance</Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholderTextColor="#05375a"
                    placeholder=" Enter Device name eg:Fan,AC,Light...etc"
                    onChangeText={Device => setDevice(Device)}
                  />
                </View>
                <Button
                  style={styles.button}
                  onPress={() => handleSubmitPress()}>
                  <Text>Save Appliance</Text>
                </Button>
              </View>
            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={editmodal}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <Button
                  transparent
                  onPress={() => {
                    seteditmodal(!editmodal);
                  }}>
                  <Icon name="close" style={{fontSize: 30, color: '#05375a'}} />
                </Button>
                <Text style={styles.text_footer}>Edit Appliance</Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholderTextColor="#05375a"
                    placeholder=" Enter Appliance name eg: Hall,dining,Kitchen...etc"
                    defaultValue={selectedapp}
                    onChangeText={Appliance => seteditedapp(Appliance)}
                  />
                </View>
                <Button style={styles.button} onPress={() => handleeditPress()}>
                  <Text>Edit Appliance</Text>
                </Button>
              </View>
            </Modal>
            <View>
              <Text style={styles.text_footer}>{selectedapp}</Text>
              <TouchableHighlight {...touchprops}>
                <Text>Click here</Text>
              </TouchableHighlight>
            </View>
            <FlatList
              keyExtractor={(item, id) => id}
              data={asyncapp}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    style={{alignSelf: 'center'}}
                    onPress={() => setselectedapp(item.Appliance)}>
                    <Text>{item.Appliance}</Text>
                  </Button>
                  <Image
                    style={styles.clicked}
                    source={{uri: item.app_images}}
                  /> 
                  {/* <Text
                adjustsFontSizeToFit
                numberOfLines={6}
                style={{
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,0)',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {item.Location}
              </Text> */}
                </View>
              )}
              ItemSeparatorComponent={() => {
                return <View style={styles.separatorLine}></View>;
              }}
            />
          </View>
          {/* <View>
            <Fab
              style={{backgroundColor: '#05375a'}}
              position="bottomRight"
              onPress={() => {
                setshowmodal(!showmodal);
              }}>
              <Icon name="add-outline" />
            </Fab>
          </View> */}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  actionButton: {
    marginLeft: 200,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    justifyContent: 'center',
    width: 200,
    alignSelf: 'center',
  },

  separatorLine: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.3)',
    margin: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },

  camtext: {
    backgroundColor: '#3498DB',
    color: '#ffffff',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },

  clicked: {
    width: 90,
    height: 90,
    borderRadius: 150,
  },
  container: {
    flex: 1,
  },
  viewer: {
    height: 230,
  },
});
export default ApplianceRegistration;
