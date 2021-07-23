import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import OwnerRegistration from './pages/OwnerRegistration';
import ApplianceRegistration from './pages/ApplianceRegistration';
import LocationRegistration from './pages/LocationRegistration';
import Binding from './pages/Binding';
import ModifyOwner from './pages/ModifyOwner';
import DummyScreen from './pages/DummyScreen';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Controller"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          tabBarLabel: 'Controller',
        }}
      />
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Registration',
        }}
      />
    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Controller"
        screenOptions={{
          headerStyle: {backgroundColor: '#633689'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{title: ' Home Automation'}}
        />

        <Stack.Screen
          name="OwnerRegistration"
          component={OwnerRegistration}
          options={{
            tabBarLabel: 'Owner Registration',
          }}
        />

        <Stack.Screen
          name="ModifyOwner"
          component={ModifyOwner}
          options={{
            tabBarLabel: ' Edit Owner Registration',
          }}
        />
        <Stack.Screen
          name="DummyScreen"
          component={DummyScreen}
          options={{
           
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ApplianceRegistration"
          component={ApplianceRegistration}
          options={{
            tabBarLabel: 'Appliance Registration',
          }}
        />

        <Stack.Screen
          name="LocationRegistration"
          component={LocationRegistration}
          options={{
            tabBarLabel: 'Location Registration',
          }}
        />

        <Stack.Screen
          name="Binding"
          component={Binding}
          options={{
            tabBarLabel: 'Binding',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
