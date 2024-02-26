import { useState, useRef } from 'react';
import './Game.css'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter); // verifica e utiliza a letra
    setLetter(""); // seta a letra como vazio no input apos a utilização

    letterInputRef.current.focus(); // faz com que o cursor do input continue la, evitando ter que clicar novamente
  };

  return (
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tip">
          Tema da palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        <div className="wordContainer">
          {letters.map((letter, i) => 
            guessedLetters.includes(letter) ? (
              <span className='letter' key={i}>{letter}</span>
            ) : (
              <span key={i} className='blankSquare'></span>
            )
          )}
        </div>
        <div className="letterContainer">
          <p>Tente advinhar a letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name='letter' maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
            <div className="botao">
              <button className="cssbuttons-io-button" onClick={handleSubmit}>
                advinhar
                <div class="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
      </div>
  );
};

export default Game