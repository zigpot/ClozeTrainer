import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function ChoiceButton({
  text,
  onPress,
  disabled,
  feedback,
  isCorrect,
}) {
  const getButtonStyle = () => {
    if (!feedback) return styles.button;

    if (isCorrect && feedback) {
      return [styles.button, styles.correctButton];
    }

    if (!isCorrect && feedback === 'incorrect') {
      return [styles.button, styles.incorrectButton];
    }

    return styles.button;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  correctButton: {
    backgroundColor: '#27AE60',
  },
  incorrectButton: {
    backgroundColor: '#E74C3C',
  },
});