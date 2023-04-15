import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
import axios from "axios";

const Detail = ({route}) => {
  const onlineSource = { uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true };
  const [pdfSource, setPdfSource] = useState ()

  const getPdf = async () => {
    const response = await axios.get (
      `publications/${route.params.publicationId}?populate=file&sort=baski`
    )

    console.log(response.data.data.attributes.file.data.attributes.url);
    setPdfSource ({
      uri: `http://192.168.130.22:1337${response.data.data.attributes.file.data.attributes.url}`,
      cache: true
    })
    // setData (response.data)
  }

  useEffect (() => {
    getPdf ()
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {
        pdfSource &&
        <Pdf
         trustAllCerts={false}
         source={pdfSource}
         onLoadComplete={(numberOfPages, filePath) => {
           console.log(`Number of pages: ${numberOfPages}`);
         }}
         onPageChanged={(page, numberOfPages) => {
           console.log(`Current page: ${page}`);
         }}
         onError={(error) => {
           console.log(error);
         }}
         onPressLink={(uri) => {
           console.log(`Link pressed: ${uri}`);
         }}
         style={styles.pdf}
      />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32
  },
  pdf: {
    flex: 1,
    alignSelf: "stretch"
  }
});

export default Detail;