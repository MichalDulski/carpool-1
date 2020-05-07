import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import colors from '../../styles/colors';
import Marker from '../../components/common/Marker';
import {vw, vh} from '../../utils/constants';
import {examplePassengerPoints} from '../../examples/points';
import RideInfoSheet from '../../components/Ride/RideInfoSheet';
import {directionsClient} from '../../maps/mapbox';
import {getBoundsForRoutes} from '../../utils/bounds';
import {activeRouteStyle, inactiveRouteStyle} from '../../styles/map';
import RouteInfoSheet from '../../components/FindRoute/RouteInfoSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/core';
import {CircleButton} from '../../components/common/buttons';

const getColor = time => {
  if (time < 20) {
    return colors.red;
  } else {
    if (time < 45) {
      return colors.orange;
    } else {
      if (time < 90) {
        return colors.yellow;
      } else {
        return colors.green;
      }
    }
  }
};

const PassengerMap = ({coordinates, _onLocateUser}) => {
  const [center, setCenter] = useState([]);
  const [ride, setRide] = useState(null);
  const [visible, setVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [activeRoute, setActiveRoute] = useState(0);

  const _passengerMap = useRef(null);
  const _passengerCamera = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    return () => onCleanState();
  }, []);

  useEffect(() => {
    if (!center.length) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (route.params) {
      if (route.params.ride) {
        _onShow();
        setRide(route.params.ride);
        setCenter(route.params.ride.coordinates);
      }
    }
  }, [route]);

  useEffect(() => {
    if (routes.length) {
      _onHide();
      const bds = getBoundsForRoutes(routes);
      setBounds({
        ...bds,
        paddingTop: 20 * vh,
        paddingBottom: 20 * vh,
      });
    }
  }, [routes]);

  const _onShow = () => {
    setVisible(true);
  };

  const _onHide = () => {
    setVisible(false);
  };

  const onShowWay = async () => {
    if (ride) {
      const response = await directionsClient
        .getDirections({
          profile: 'walking',
          waypoints: [
            {
              coordinates: coordinates,
            },
            {
              coordinates: ride.coordinates,
            },
          ],
          overview: 'full',
          geometries: 'geojson',
          alternatives: true,
        })
        .send();

      setRoutes(response.body.routes);
    }
  };

  const onSelected = point => {
    _onShow();
    setCenter(point.coordinates);
    setRide(point);
  };

  const onCleanState = () => {
    _onHide();
    setRide(null);
    setCenter(coordinates);
    setBounds(null);
    setRoutes([]);
  };

  const renderPassengerPoints = () =>
    examplePassengerPoints.map(point => (
      <MapboxGL.PointAnnotation
        key={point.id}
        id="selected"
        coordinate={point.coordinates}
        onSelected={() => onSelected(point)}
        onDeselected={onCleanState}>
        <Marker
          color={getColor(point.timeLeft)}
          size={6 * vw}
          style={styles.marker}
        />
      </MapboxGL.PointAnnotation>
    ));

  const renderRoutes = () => {
    return routes.length
      ? routes.map((item, index) => (
          <MapboxGL.ShapeSource
            key={index}
            id={`route${index}`}
            shape={item.geometry}
            onPress={() => setActiveRoute(index)}>
            <MapboxGL.LineLayer
              id={`route${index}`}
              style={
                index === activeRoute ? activeRouteStyle : inactiveRouteStyle
              }
              layerIndex={index === activeRoute ? 40 : 30}
            />
          </MapboxGL.ShapeSource>
        ))
      : null;
  };

  return (
    <>
      <MapboxGL.MapView
        ref={_passengerMap}
        style={{flex: 1}}
        styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
        contentInset={10}
        compassEnabled={false}
        onPress={() => {
          if (visible) {
            onCleanState();
          }
        }}
        rotateEnabled={false}>
        <MapboxGL.Camera
          ref={_passengerCamera}
          zoomLevel={14}
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={500}
          centerCoordinate={
            bounds ? undefined : [center[0], center[1] - 0.0015]
          }
          bounds={bounds ? bounds : undefined}
        />
        <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
        {renderPassengerPoints()}
        {renderRoutes()}
      </MapboxGL.MapView>
      <RideInfoSheet
        visible={visible}
        point={ride}
        userLocation={coordinates}
        onShowWay={onShowWay}
      />
      {!visible && routes.length ? (
        <RouteInfoSheet route={routes[activeRoute]} onGoBack={onCleanState} />
      ) : null}
      {ride || visible ? null : (
        <CircleButton
          style={{position: 'absolute', bottom: 8 * vh, right: 5 * vw}}
          onPress={() => navigation.navigate('AskForRide')}
          icon={<Icon name="plus" color={colors.grayDark} size={8 * vw} />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  marker: {
    marginTop: -6 * vw,
    padding: 2.5 * vw,
  },
  button: {
    height: 16 * vw,
    width: 16 * vw,
    position: 'absolute',
    bottom: 8 * vh,
    right: 5 * vw,
  },
});

export default PassengerMap;
