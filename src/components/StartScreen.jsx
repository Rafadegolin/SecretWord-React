import React from 'react';
import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <div className='logo'>
          <h1>Secret</h1>
          <h1>Word</h1>
        </div>
        <p>Clique no botão abaixo para começar a jogar</p>
        <div className="botao">
          <button onClick={startGame} className="cssbuttons-io-button">
            JOGAR!
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
    </div>
  );
};

export default StartScreen