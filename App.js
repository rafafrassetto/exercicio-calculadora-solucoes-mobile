import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Provider as PaperProvider, Text, Surface, MD3LightTheme } from 'react-native-paper';

const HIEROGLYPHS = {
  '0': '𓄼',
  '1': '𓏤',
  '2': '𓏥',
  '3': '𓏦',
  '4': '𓏧',
  '5': '𓏨',
  '6': '𓏩',
  '7': '𓏪',
  '8': '𓏫',
  '9': '𓏬',
  '+': '𓐝', 
  '-': '𓐞', 
  '*': '𓐟', 
  '/': '𓐠', 
  '=': '𓐡', 
  'C': '𓐢',
  '.': '𓇳'
};

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#D4AF37',
    secondary: '#8B4513',
    background: '#F5F5DC',
    surface: '#FFF8DC',
    onSurface: '#3E2723',
  },
};

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = performCalculation[operator](currentValue, inputValue);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next,
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const renderHieroglyphs = (text) => {
    return text.split('').map(char => HIEROGLYPHS[char] || char).join('');
  };

  const CalcButton = ({ label, onPress, color, flex = 1 }) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color || theme.colors.surface, flex }]} 
      onPress={() => onPress(label)}
    >
      <Text style={styles.buttonText}>{HIEROGLYPHS[label] || label}</Text>
    </TouchableOpacity>
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>𓁹 𓄿 𓃭 𓂝 𓅱 𓃭 𓄿 𓂧 𓅱 𓂋 𓄿</Text>
          <Text style={styles.subtitle}>Calculadora Hieroglífica</Text>
        </View>

        <Surface style={styles.displayContainer}>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {renderHieroglyphs(display)}
          </Text>
        </Surface>
        
        <View style={styles.grid}>
          <View style={styles.row}>
            <CalcButton label="C" onPress={clear} color="#FF6B6B" flex={2} />
            <CalcButton label="." onPress={handleDigit} />
            <CalcButton label="/" onPress={handleOperator} color={theme.colors.primary} />
          </View>
          
          <View style={styles.row}>
            <CalcButton label="7" onPress={handleDigit} />
            <CalcButton label="8" onPress={handleDigit} />
            <CalcButton label="9" onPress={handleDigit} />
            <CalcButton label="*" onPress={handleOperator} color={theme.colors.primary} />
          </View>
          
          <View style={styles.row}>
            <CalcButton label="4" onPress={handleDigit} />
            <CalcButton label="5" onPress={handleDigit} />
            <CalcButton label="6" onPress={handleDigit} />
            <CalcButton label="-" onPress={handleOperator} color={theme.colors.primary} />
          </View>
          
          <View style={styles.row}>
            <CalcButton label="1" onPress={handleDigit} />
            <CalcButton label="2" onPress={handleDigit} />
            <CalcButton label="3" onPress={handleDigit} />
            <CalcButton label="+" onPress={handleOperator} color={theme.colors.primary} />
          </View>
          
          <View style={styles.row}>
            <CalcButton label="0" onPress={handleDigit} flex={3} />
            <CalcButton label="=" onPress={() => handleOperator('=')} color="#51CF66" />
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const { width } = Dimensions.get('window');
const buttonSize = (width - 60) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0522D',
    fontStyle: 'italic',
  },
  displayContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    backgroundColor: '#FFF8DC',
    elevation: 8,
    borderWidth: 3,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  displayText: {
    fontSize: 48,
    color: '#3E2723',
    textAlign: 'right',
  },
  grid: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    height: 75,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E2723',
  },
});
