import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ResultScreen({route, navigation}) {
  const {score = 0, total = 10} = route?.params || {};
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getResultMessage = () => {
    if (percentage >= 90) return '¡Excelente!';
    if (percentage >= 70) return '¡Muy bien!';
    if (percentage >= 50) return '¡Buen trabajo!';
    return '¡Sigue practicando!';
  };

  const getResultColor = () => {
    if (percentage >= 90) return '#27AE60';
    if (percentage >= 70) return '#4A90E2';
    if (percentage >= 50) return '#F39C12';
    return '#E74C3C';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>{getResultMessage()}</Text>

        <View
          style={[styles.scoreCircle, {borderColor: getResultColor()}]}>
          <Text style={[styles.percentage, {color: getResultColor()}]}>
            {percentage}%
          </Text>
          <Text style={styles.scoreText}>
            {score} / {total}
          </Text>
        </View>

        <Text style={styles.subtitle}>Questions Correct</Text>

        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}>
          <Text style={styles.playAgainText}>Play Again</Text>
        </TouchableOpacity>
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
  message: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 40,
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  percentage: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    color: '#7F8C8D',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#95A5A6',
    marginBottom: 50,
  },
  playAgainButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  playAgainText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});