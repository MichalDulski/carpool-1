import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...sheet.rowCenter,
  },
  wrapper: {
    height: 85,
    flex: 1,
    ...sheet.rowCenter,
  },
  columnLeft: {
    flexDirection: 'column',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
  },
  columnRight: {
    flexDirection: 'column',
    height: 85,
    justifyContent: 'space-between',
  },
  placeName: {
    ...sheet.textSemiBold,
    fontSize: 14,
    color: colors.grayDark,
  },
  line: {
    flex: 1,
    backgroundColor: colors.grayVeryDark,
    width: 1,
    marginVertical: 1,
  },
});