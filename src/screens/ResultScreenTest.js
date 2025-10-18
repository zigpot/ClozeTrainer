import React from 'react';
import {View, Text} from 'react-native';

export default function ResultScreenTest(props) {
  console.log('ResultScreenTest props:', JSON.stringify(props));
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test Screen</Text>
      <Text>Props: {JSON.stringify(props)}</Text>
    </View>
  );
}
