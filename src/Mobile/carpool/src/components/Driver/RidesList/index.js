import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {colors} from '../../../styles';
import {ListEmptyComponent} from '../../common/lists';
import ListItem from './ListItem';
import {styles} from './index.styles';

const RidesList = ({data, loading, onRefresh, onItemPress}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => <ListItem item={item} onItemPress={onItemPress} />}
    refreshControl={
      <RefreshControl
        colors={[colors.green]}
        tintColor={colors.green}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    }
    ListEmptyComponent={
      <ListEmptyComponent title="no rides found" onRefresh={onRefresh} />
    }
  />
);

export default RidesList;