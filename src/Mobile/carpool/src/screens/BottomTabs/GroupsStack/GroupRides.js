import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {GoBack, Header} from '../../../components/navigation';
import * as actions from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {RidesList} from '../../../components/Driver';
import SelectLocation from '../SearchStack/Search/sections/SelectLocation';
import {sortRides, byDateAndExtension} from '../../../utils/rides';
import moment from 'moment';

const GroupRides = ({route, navigation}) => {
  const {group} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();

  if (location && selectedRide) {
    navigation.navigate('SearchStack', {
      screen: 'SelectedRideDetails',
      params: {
        ride: selectedRide,
        data: {location},
      },
    });
  }

  useEffect(() => {
    const onPress = () => {
      if (location) {
        setLocation(null);
      } else {
        navigation.goBack();
      }
    };

    navigation.setOptions({
      title: group.name,
      header: props => <Header {...props} />,
      headerLeft: () => <GoBack onPress={onPress} />,
    });
  }, [location]);

  useEffect(() => {
    if (location && !data) {
      onRefresh();
    }
    if (data && location) {
      const sorted = sortRides([...data], location, byDateAndExtension);

      let withDates = [];
      try {
        sorted.forEach((item, index) => {
          if (index === 0) {
            withDates = [...withDates, {...item, showDate: true}];
          } else {
            const isSame = moment(item.rideDate).isSame(
              moment(sorted[index - 1].rideDate),
              'day',
            );

            withDates = [...withDates, {...item, showDate: !isSame}];
          }
        });
      } catch {
        withDates = [...sorted];
      }

      setSortedData([...withDates]);
    }
  }, [data, location]);

  useEffect(() => {
    if (sortedData) {
      setLoading(false);
    }
  }, [sortedData]);

  const onRefresh = () => {
    setLoading(true);
    dispatch(actions.getGroupRides(group.groupId))
      .then(res => setData(res))
      .catch(err =>
        Alert.alert(
          'Error',
          'An error ocurred when trying to load data. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
              onPress: () => navigation.goBack(),
            },
          ],
        ),
      );
  };

  const onItemPress = item =>
    Alert.alert('Confirmation', 'Are you sure you want to join this ride?', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {
        text: 'Confirm',
        style: 'default',
        onPress: () => setSelectedRide(item),
      },
    ]);

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      {!location ? (
        <SelectLocation onSubmit={setLocation} />
      ) : (
        <RidesList
          data={sortedData}
          loading={loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
          showHeader={!!sortedData ? !!sortedData.length : false}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupRides;
