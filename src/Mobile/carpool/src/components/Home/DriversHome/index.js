import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';
import {sheet, colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {AccountSwitch} from '../../navigation';
import {RideDetailsCard} from '../../Ride';
import {useSelector} from 'react-redux';
import {ListEmptyComponent} from '../../common/lists';
import {ThreeGroupsList} from '../../Groups';
import {styles} from './index.styles';

const DriversHome = () => {
  const navigation = useNavigation();
  const [ride, setRide] = useState(null);

  const driversRides = useSelector(state => state.driverReducer.driversRides);
  const groups = useSelector(store => store.accountReducer.groups);

  useEffect(() => {
    if (driversRides.data) {
      setRide(driversRides.data[0]);
    }
  }, [driversRides]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <AccountSwitch />
        </View>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Upcoming ride</Text>
          <Text
            onPress={() => navigation.navigate('DriversRides')}
            style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View style={styles.flexed}>
          {driversRides.loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : ride ? (
            <RideDetailsCard
              ride={ride}
              onItemPress={ride =>
                navigation.navigate('RidesStack', {
                  screen: 'DriversRideDetails',
                  params: {ride, past: false},
                })
              }
            />
          ) : (
            <ListEmptyComponent title="You don't have any upcoming rides" />
          )}
        </View>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Your groups</Text>
          <Text
            onPress={() => navigation.navigate('Groups')}
            style={styles.seeAll}>
            More
          </Text>
        </View>
        <View style={styles.flexed}>
          {groups.loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : groups.data ? (
            <ThreeGroupsList
              groups={groups.data}
              onItemPress={group =>
                navigation.navigate('GroupsStack', {
                  screen: 'GroupDetails',
                  params: {group},
                })
              }
            />
          ) : (
            <ListEmptyComponent title="You are not a member of any group yet" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriversHome;
