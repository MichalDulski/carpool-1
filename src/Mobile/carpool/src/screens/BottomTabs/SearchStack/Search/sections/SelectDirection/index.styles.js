import {colors, sheet} from '../../../../../../styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    color: colors.orange,
    ...sheet.textSemiBold,
    marginBottom: 50,
  },
  info: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 18,
    marginBottom: 20,
  },
  upview: {
    height: 60,
    width: '46%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 22,
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 28,
    marginTop: 20,
  },
  placeName: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 14,
    marginTop: 8,
    marginLeft: 10,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
});
