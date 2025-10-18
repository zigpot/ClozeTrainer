import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import SentenceCard from '../components/SentenceCard';
import ChoiceButton from '../components/ChoiceButton';
import quizData from '../../assets/porpara.json';

export default function QuizScreen({route, navigation}) {
  // Defensive parameter extraction
  let roundSize = 10;
  if (route && route.params && route.params.roundSize) {
    roundSize = route.params.roundSize;
  }

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const timeoutRef = useRef(null);

  useEffect(() => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, roundSize));
  }, [roundSize]);

  useEffect(() => {
    if (questions.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = choice => {
    if (disabled || questions.length === 0) return;

    setDisabled(true);
    const correct = choice === questions[currentIndex].answer;
    const newScore = correct ? score + 1 : score;

    if (correct) {
      setScore(newScore);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    timeoutRef.current = setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setFeedback(null);
        setDisabled(false);
        fadeAnim.setValue(0);
      } else {
        // Navigate to result using push (avoids pre-render issues)
        navigation.push('Result', {
          score: newScore,
          total: questions.length,
        });
      }
    }, 600);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = `${currentIndex + 1} / ${questions.length}`;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progress}</Text>
      </View>

      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <SentenceCard
          spanish={currentQuestion.spanish}
          english={currentQuestion.english}
        />

        <View style={styles.choicesContainer}>
          <ChoiceButton
            text="por"
            onPress={() => handleAnswer('por')}
            disabled={disabled}
            feedback={feedback}
            isCorrect={currentQuestion.answer === 'por'}
          />
          <ChoiceButton
            text="para"
            onPress={() => handleAnswer('para')}
            disabled={disabled}
            feedback={feedback}
            isCorrect={currentQuestion.answer === 'para'}
          />
        </View>

        {feedback && (
          <View style={styles.feedbackContainer}>
            <Text
              style={[
                styles.feedbackText,
                feedback === 'correct' ? styles.correct : styles.incorrect,
              ]}>
              {feedback === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
            </Text>
          </View>
        )}
      </Animated.View>
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
    padding: 20,
    justifyContent: 'space-between',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correct: {
    color: '#27AE60',
  },
  incorrect: {
    color: '#E74C3C',
  },
});