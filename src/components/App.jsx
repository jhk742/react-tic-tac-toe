import React, {useState, useEffect} from 'react'
import Square from './Square'
import { Patterns } from './Patterns'

export default function App() {

    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [marker, setMarker] = useState(false)
    const [result, setResult] = useState({winner: "none", state: "none"})
    const [replay, setReplay] = useState(false)
 
    const resetStates = () => {
        setBoard(["", "", "", "", "", "", "", "", ""])
        setMarker(false)
        setResult({winer: "none", state: "none"})
        setReplay(prev => !prev)
    }

    //check if someone won everytime the state, "board", is updated
    useEffect(() => {
        checkWin()
        checkTie()
    }, [board])

    //run only when state, "result", has been modified
    useEffect(() => {
        if(result.state != "none") {
            setReplay(prev => !prev)
        }
    }, [result])

    function chooseSquare(square) {
        setBoard(prevBoard => {
            return prevBoard.map((sqr, index) => {
                return index === square ? (marker ? "X" : "O") : sqr
            })
        })
        

        setMarker(prevMarker => !prevMarker)
    }

    const checkWin = () => {
        Patterns.map((currPattern) => {
            const firstPlayer = board[currPattern[0]]
            if (firstPlayer === "") return;
            let patternMatch = true
            currPattern.map((index, _) => {
                if (board[index] != firstPlayer) {
                    patternMatch = false
                }
            })

            if (patternMatch) {
                setResult({winner: marker ? "O" : "X", state: "won"})
            }
        })
    }

    const checkTie = () => {
        let tie = true
        board.map(square => {
            if (square == "") {
                tie = false
            }
        })
        if (tie) {
            setResult({winner: "No One", state: "tie"})
        }
    }
    
    const boardLayout = board.map((square, index) => {
        return <Square key={index} val={board[index]} chooseSquare={() => {chooseSquare(index)}}/>
    }) 

    

    return (
        <div className="app">
            <h1>Tic-Tac-Toe</h1>
            <div className="board">
                {boardLayout}
                {replay && 
                    <div className="div--replay">
                        <p>{`Game finished ${result.state === "won" ? `with "${result.winner}" as the victor!` : "in a tie!"}`}</p>
                        <button onClick={resetStates}>Play Again</button>
                    </div>
                }
            </div>
        </div>
    )
}