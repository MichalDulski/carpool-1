import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {colors, sheet} from '../../styles';
import {vh} from '../../utils/constants';
import {Marker} from '../common';
import {StandardButton} from '../common/buttons';

const LocationSheet = ({_onSelect, _onGoBack, location}) => {
  const _renderContent = () => (
    <View style={styles.content}>
      <View style={sheet.rowCenter}>
        <Marker size={28} color={colors.blue} style={{marginRight: 12}} />
        <Text style={styles.placeName}>{location.place_name}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <StandardButton
          color={colors.red}
          title="Go back"
          onPress={_onGoBack}
          width="45%"
        />
        <StandardButton
          color={colors.green}
          title="Select"
          onPress={_onSelect}
          width="45%"
        />
      </View>
    </View>
  );

  const _renderHeader = () => <View style={styles.header} />;

  return (
    <BottomSheet
      snapPoints={[0, 25 * vh]}
      initialSnap={1}
      renderContent={_renderContent}
      renderHeader={_renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: colors.background,
    height: '100%',
    paddingTop: 1 * vh,
    paddingBottom: 6 * vh,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  placeName: {
    ...sheet.textMedium,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: colors.grayVeryDark,
  },
  buttonsContainer: {
    ...sheet.rowCenter,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: 6 * vh,
  },
  goBack: {
    color: colors.red,
    fontSize: 2.25 * vh,
    ...sheet.textBold,
  },
  select: {
    color: colors.green,
    fontSize: 2.25 * vh,
    ...sheet.textBold,
  },
  header: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    height: 2.5 * vh,
  },
});

export default LocationSheet;
