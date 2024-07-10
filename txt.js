/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

  // lastChoice = lastChoice === player1.getSign() ? player2.getSign() : player1.getSign()
        // e.target.innerText = lastChoice
        // displayGameController.toggleActivePlayer()
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        function checkWinerX(){
            return winPatterns.some((combinaition)=>{
                return combinaition.every((i)=>{
                    return cells[i].innerText === player1.getSign();
                })
            })
            }