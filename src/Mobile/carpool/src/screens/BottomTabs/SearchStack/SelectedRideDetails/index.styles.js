import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingBottom: 30,
  },
  topRow: {
    padding: 16,
  },
  time: {
    ...sheet.textMedium,
    fontSize: 22,
    color: colors.blue,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 5,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    padding: 16,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
  },
  driverWrapper: {
    ...sheet.rowCenter,
    padding: 16,
  },
  driver: {
    ...sheet.textMedium,
    color: colors.grayVeryDark.slic,
    fontSize: 16,
    marginLeft: 16,
  },
});
