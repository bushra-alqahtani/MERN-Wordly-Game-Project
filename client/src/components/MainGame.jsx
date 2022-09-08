
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "../Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./GameOver";
import { useLocation } from "react-router-dom";
export const AppContext = createContext();



function MainGaming() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
    const [wordSet, setWordSet] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false,
    });
    const location = useLocation();
    const [userName, setUserName]=useState([])

    
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        setUserName(location.state.detail); // result: 'some_value'
    }, [location]);



    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord);
        });
    }, []);

    const onEnter = () => {
        if (currAttempt.letter !== 5) return;

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i];
        }
        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
        } else {
            alert("Word not found");
        }

        if (currWord === correctWord) {
            setGameOver({ gameOver: true, guessedWord: true });
            return;
        }
        console.log(currAttempt);
        if (currAttempt.attempt === 5) {
            setGameOver({ gameOver: true, guessedWord: false });
            return;
        }
    };

    const onDelete = () => {
        if (currAttempt.letter === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
    };

    const onSelectLetter = (key) => {
        if (currAttempt.letter > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter] = key;
        setBoard(newBoard);
        setCurrAttempt({
            attempt: currAttempt.attempt,
            letter: currAttempt.letter + 1,
        });
    };

    return (
        <div >

            <div >
            <nav>
                <h1 className="h1">Wordle</h1>
            </nav>
            <br />
            <h5>Welcome {userName}</h5>
            <br/>
           
            <AppContext.Provider
                value={{
                    board,
                    setBoard,
                    currAttempt,
                    setCurrAttempt,
                    correctWord,
                    onSelectLetter,
                    onDelete,
                    onEnter,
                    setDisabledLetters,
                    disabledLetters,
                    gameOver,
                }}
            >
                <div>
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </AppContext.Provider>
            </div>
            </div >
            )

}

export default MainGaming;