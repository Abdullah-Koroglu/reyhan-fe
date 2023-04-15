import React, { useEffect, useState } from 'react';
import axios from "axios";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { SearchBar } from '@rneui/themed';

const List = ({navigation}) => {
  const [data, setData] = useState ([])
  const [search, updateSearch] = useState ([])
  const [page, setPage] = useState (1)

  const getData = async(page) => {
    const response = await axios.get (
      `publications?populate=thumbnail&sort=baski&pagination[page]=${page}&pagination[pageSize]=50`
    )
    // setData (prev => ([...prev, ...response.data]))
    setData (response.data)

  }

  const searchPublication = async () => {
    const response = await axios.get (
      `publications?populate=thumbnail&sort=baski&filters[baski][$containsi]=${search}` // contains mi is mi?
    )

    setData (response.data)
    }

  useEffect (() => {
    getData (page)
  }, [])

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          padding: 10, //TODO will change to 10
          paddingHorizontal: 20,
          borderRadius: 5,
          margin: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {navigation.navigate ('Detail', {publicationId: item.id})}}
      >
        {item.attributes.thumbnail && <Image
          style={[
            {
              width: item.attributes.thumbnail.data.attributes.formats.thumbnail.width,
              height: item.attributes.thumbnail.data.attributes.formats.thumbnail.height,
            },
            {
              marginBottom: 10
            }
          ]}
          source={{uri:
            `http://192.168.130.22:1337${item.attributes.thumbnail.data.attributes.formats.small.url}`}}
        />}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18
            }}
          >{item.attributes.baski}</Text>
          <Text
            style={{
              color: '#999'
            }}
          >{item.attributes.basim_tarihi}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={styles.container}>
      <SearchBar
        platform='android'
        lightTheme
        placeholder="Sayı ara.."
        onChangeText={updateSearch}
        value={search}
        onKeyboardHide={() => searchPublication ()}
        onClear={() => getData (0)}
        containerStyle={{
          // backgroundColor: 'red',
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <FlatList
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          width: '100%',
          alignItems:'center',
          padding: 10,
        }}
        numColumns={2}
        data={data.data}
        renderItem={({item}) => renderItem (item)}
        key={'#'}
        keyExtractor={item => "#" + item.id}
        // onEndReached={() => {getData(page + 1); setPage (page + 1)}}
        // onEndThreshold={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default List;