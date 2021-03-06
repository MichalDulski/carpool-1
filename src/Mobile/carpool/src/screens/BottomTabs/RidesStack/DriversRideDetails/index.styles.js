import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingBottom: 80,
  },
  topRow: {
    padding: 16,
    ...sheet.rowCenterSplit,
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
  moreIcon: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  bottomWrapper: {
    flex: 1,
    paddingVertical: 8,
  },
  upView: {
    width: '46%',
    height: 100,
  },
  passengersList: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});
