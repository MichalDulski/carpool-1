import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../../../../components/navigation';
import {useIsFocused} from '@react-navigation/native';
import {
  GroupDetails,
  Groups,
  Invitations,
  GroupRides,
} from '../../../../screens/BottomTabs';

const {useEffect} = React;
const Stack = createStackNavigator();

const GroupsStack = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    // Reset stack navigator when it blurs
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Groups'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        title: 'Groups',
      }}
      headerMode="screen">
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          title: 'Your groups',
        }}
      />
      <Stack.Screen
        name="Invitations"
        component={Invitations}
        options={{
          title: 'Group invitations',
        }}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{
          title: 'Group details',
        }}
      />
      <Stack.Screen
        name="GroupRides"
        component={GroupRides}
        options={{
          title: 'Group Rides',
        }}
      />
    </Stack.Navigator>
  );
};

export default GroupsStack;
