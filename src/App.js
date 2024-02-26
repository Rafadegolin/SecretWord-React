// CSS
import './App.css';

// React
import { useCallback, useEffect, useState} from 'react';

// Data
import {wordsList} from "./data/words.js";

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
];

const guessesQtd = 4;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(category, word);

    return { category, word };
  }, [words]);

  // começa o jogo
  const startGame = useCallback(() => {
    // clear nas letras
    clearLettersStates();

    // pega palavra e categoria
    const { word, category } = pickWordAndCategory();
    console.log(word, category);

    // criar um array de letras
    let wordLetters = word.split(""); // separa as letras da palavra
    wordLetters = wordLetters.map((l) => l.toLowerCase()) // deixa todas as letras em lowerCase
    //console.log(wordLetters)

    // preencher os useStates
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // processa o input da letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // confere se a letra ja foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // acerta a letra ou remove chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  };

  // restarta o game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);

    setGameStage(stages[0].name);
  };

  // Limpa states das letras
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // confere se as tentativas terminaram
  useEffect(() => {
    if (guesses === 0) {
      // game over and reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // confere condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]; // "Set" só gera array com elementos unicos, no caso de palavras com mais de 1 letra igual

    // condição de vitória
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // adiciona score
      setScore((actualScore) => (actualScore += 100));

      // audio do acerto
      //const audio = new Audio('/sounds/acerto.mp3');
      //audio.play();

      // restart o jogo com uma nova palavra
      setTimeout(() => {
        startGame()
      }, 1000)
      setGuesses(guessesQtd);
    }
    console.log(uniqueLetters);
  }, [guessedLetters, letters, startGame]);

  

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
