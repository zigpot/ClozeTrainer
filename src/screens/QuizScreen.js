import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import SentenceCard from '../components/SentenceCard';
import ChoiceButton from '../components/ChoiceButton';

// Hardcoded data to eliminate JSON loading issues
const QUIZ_DATA = [
  {"spanish": "Lo hice ___ ti.", "english": "I did it for you.", "answer": "por"},
  {"spanish": "Estudié ___ tres horas.", "english": "I studied for three hours.", "answer": "por"},
  {"spanish": "Este regalo es ___ mi madre.", "english": "This gift is for my mother.", "answer": "para"},
  {"spanish": "Viajamos ___ España.", "english": "We traveled through Spain.", "answer": "por"},
  {"spanish": "Necesito un lápiz ___ escribir.", "english": "I need a pencil to write.", "answer": "para"},
  {"spanish": "Lo compré ___ cincuenta dólares.", "english": "I bought it for fifty dollars.", "answer": "por"},
  {"spanish": "Salgo ___ Madrid mañana.", "english": "I'm leaving for Madrid tomorrow.", "answer": "para"},
  {"spanish": "Gracias ___ tu ayuda.", "english": "Thank you for your help.", "answer": "por"},
  {"spanish": "Trabajo ___ una empresa grande.", "english": "I work for a large company.", "answer": "para"},
  {"spanish": "Pasamos ___ el parque.", "english": "We passed through the park.", "answer": "por"},
];

export default function QuizScreen({route, navigation}) {
  const roundSize = route?.params?.roundSize || 10;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const shuffled = [...QUIZ_DATA].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, Math.min(roundSize, QUIZ_DATA.length)));
  }, [roundSize]);

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

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setFeedback(null);
        setDisabled(false);
      } else {
        setIsComplete(true);
      }
    }, 600);
  };

  const goToResults = () => {
    navigation.navigate('Result', {
      score: score,
      total: questions.length,
    });
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

  if (isComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.completeText}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>
            Score: {score} / {questions.length}
          </Text>
          <TouchableOpacity
            style={styles.resultsButton}
            onPress={goToResults}>
            <Text style={styles.resultsButtonText}>View Results</Text>
          </TouchableOpacity>
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

      <View style={styles.content}>
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
  completeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 40,
  },
  resultsButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignSelf: 'center',
  },
  resultsButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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