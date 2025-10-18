import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  const roundSizes = [10, 20, 50];

  const startQuiz = size => {
    navigation.navigate('Quiz', {
      roundSize: size,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Por vs Para</Text>
        <Text style={styles.subtitle}>
          Choose the correct preposition for each sentence. what the fuck
        </Text>

        <View style={styles.buttonContainer}>
          <Text style={styles.label}>Select Round Size:</Text>
          {roundSizes.map(size => (
            <TouchableOpacity
              key={size}
              style={styles.sizeButton}
              onPress={() => startQuiz(size)}
              activeOpacity={0.7}>
              <Text style={styles.sizeButtonText}>{size} Questions</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 20,
    textAlign: 'center',
  },
  sizeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sizeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
