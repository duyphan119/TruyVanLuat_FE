import Button from "@/components/common/Button";
import React, { useEffect, useState } from "react";

type Props = {};

const TicTacToe = (props: Props) => {
  const EMPTY_BOARD = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [isStart, setIsStart] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClick = (indexRow: number, indexCol: number) => {
    if (isStart) {
      const newBoard = [...board];
      newBoard[indexRow][indexCol] = turn;
      setBoard(newBoard);
      if (!checkWin(newBoard)) {
        if (newBoard.every((row) => row.every((col) => col !== ""))) {
          setMsg(`It's a draw`);
          setIsStart(false);
        } else {
          setTurn((state) => (state === "X" ? "O" : "X"));
        }
      } else {
        setIsStart(false);
        setMsg(`Winner: ${turn}`);
      }
    }
  };

  const checkRow = (board: string[][]) => {
    return board.some(
      (row) => row[0] !== "" && row[0] === row[1] && row[1] === row[2]
    );
  };
  const checkCol = (board: string[][]) => {
    return board.some(
      (_, index) =>
        board[0][index] !== "" &&
        board[0][index] === board[1][index] &&
        board[1][index] === board[2][index]
    );
  };
  const checkDiagonal = (board: string[][]) => {
    return (
      (board[0][0] !== "" &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[0][2] !== "" &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0])
    );
  };

  const checkWin = (board: string[][]) => {
    return checkRow(board) || checkCol(board) || checkDiagonal(board);
  };

  const handleStart = () => {
    setIsStart((state) => !state);
    setBoard(EMPTY_BOARD);
    setMsg("");
  };

  return (
    <div className="p-24 flex flex-col items-center gap-6">
      <div className="font-semibold text-3xl">Tic Tac Toe</div>
      <div className="">This turn: {turn}</div>
      <div className="">
        {board.map((row, indexRow) => {
          return (
            <div className="flex items-center" key={`row${indexRow}`}>
              {row.map((col, indexCol) => {
                return (
                  <button
                    className={`w-16 h-16 flex items-center justify-center border border-blue-500 ${
                      isStart && col === ""
                        ? "hover:bg-blue-500"
                        : "cursor-not-allowed"
                    }`}
                    key={`col${indexCol}`}
                    onClick={() => handleClick(indexRow, indexCol)}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      {msg !== "" ? <div className="">{msg}</div> : null}
      {isStart ? null : (
        <Button className="" onClick={handleStart}>
          Start
        </Button>
      )}
    </div>
  );
};

export default TicTacToe;
