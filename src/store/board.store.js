import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'

export function getActionRemoveBoard(boardId) {
    return {
        type: 'removeBoard',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'addBoard',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'updateBoard',
        board
    }
}

export const boardStore = {
    state: {
        boards: null,
        currBoard: null,
        currCard: null
    },
    getters: {
        boards({ boards }) { return boards },
        getCurrBoard(state) { return state.currBoard },
        getMembersOfBoard(state) { return state.currBoard.members },
        getLabelsOfBoard(state) { return state.currBoard.labels },
        getCard(state) {
            return state.currCard
        },
        // getGroupTitle(state) {
        //     return boardService.findGroupById(state.currCard.groupId, state.currBoard).title
        // },
        getBoardImg(state) {
            return state.currBoard.coverImg
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            state.currBoard = board
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setBoardById(state, { id }) {
            // const board = JSON.parse(JSON.stringify(state.boards))[0];
            const board = state.boards.find(b => b._id === id)
            console.log(board)
            state.currBoard = board

        },
        setCurrCard(state, { cardId }) {
            state.currBoard.groups.forEach(group => {
                if (group.cards) {

                    group.cards.forEach(card => {
                        if (card.id === cardId) {
                            state.currCard = card
                            return
                        }
                    })
                }
            })
        },
        saveCard(state, { card, groupId }) {
            // let cardIdx = 0
            // let groupIdx = -1
            const group = boardService.findGroupById(groupId, state.currBoard)
            card.id = utilService.makeId()
            group.cards.push(JSON.parse(JSON.stringify(card)))

            // state.currBoard.groups.forEach((group, idx1) => {
            //     group.cards.forEach((currCard, idx) => {
            //         if (currCard.id === card.id) {
            //             cardIdx = idx
            //             groupIdx = idx1
            //         }
            //     })
            //     if (groupIdx >= 0) state.currBoard.groups[groupIdx].cards.splice(cardIdx, 1, JSON.parse(JSON.stringify(card)))
            // })
            // const boardIdx = state.boards.findIndex(c => c.id === state.currBoard._id)
            // state.boards.splice(boardIdx, 1, state.currBoard)
            // boardService.save(state.currBoard)
        },
        // saveCard(state, { card, groupId }) {
        //     const group = boardService.findGroupById(groupId, state.currBoard)
        //     if (card.id) {
        //         const cardIdx = group.cards.findIndex(c => c.id === card.id)
        //         group.cards[cardIdx] = JSON.parse(JSON.stringify(card))
        //     } else {
        //         group.cards.push(JSON.parse(JSON.stringify(card)))
        //     }
        // },
        updateLabels(state, { labels }) {
            const newLabels = JSON.parse(JSON.stringify(labels))
            state.currBoard.labels = newLabels
            const idx = state.boards.findIndex(c => c.id === state.currBoard._id)
            state.boards.splice(idx, 1, state.currBoard)
            boardService.save(state.currBoard)
        },
        updateGroup(state, { group }) {
            const groupIdx = state.currBoard.groups.findIndex(currGroup => currGroup.id === group.id)
            state.currBoard.groups.splice(groupIdx, 1, group)
        }
    },
    actions: {
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionAddBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async updateBoard({ commit, state }, { board }) {
            try {

                board = await boardService.save(board)
                commit({ type: 'updateBoard', board })

            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                console.log("🚀 ~ file: board.store.js:143 ~ loadBoards ~ boards", boards)
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
        async addCard({ dispatch, state }, { card }) {
            console.log("🚀 ~ file: board.store.js:159 ~ addCard ~ card", card)
            card.id = utilService.makeId()
            const board = JSON.parse(JSON.stringify(state.currBoard))
            const group = boardService.findGroupById(card.groupId, board)
            group.cards.push(card)
            try {
                dispatch({ type: "updateBoard", board })
            } catch (err) {
                console.log('Error, could not Add or update list')
                throw err
            }
        },
        async addList({ dispatch, state }, { list }) {
            list.id = utilService.makeId()
            const board = JSON.parse(JSON.stringify(state.currBoard))
            board.groups.push(list)
            dispatch({ type: "updateBoard", board })
        },
        async removeList({ dispatch, state }, { id }) {
            const board = JSON.parse(JSON.stringify(state.currBoard))

        },
        async saveCard({ dispatch, state }, { card, groupId }) {
            const board = JSON.parse(JSON.stringify(state.currBoard))
            const groupIdx = board.groups.findIndex((group) => group.id === card.groupId)
            const cardIdx = board.groups[groupIdx].cards.findIndex((currCard) => currCard.id === card.id)
            board.groups[groupIdx].cards.splice(cardIdx, 1, JSON.parse(JSON.stringify(card)))
            // board.groups.forEach((group, idx1) => {
            //     if (group.cards) {
            //         group.cards.forEach((currCard, idx) => {
            //             if (currCard.id === card.id) {
            //                 cardIdx = idx
            //                 groupIdx = idx1
            //             }
            //         })
            //         if (groupIdx >= 0) board.groups[groupIdx].cards.splice(cardIdx, 1, JSON.parse(JSON.stringify(card)))
            //     }
            // })
            dispatch({ type: "updateBoard", board })
        },
        async removeCard({ dispatch, state }, { cardId }) {
            const board = JSON.parse(JSON.stringify(state.currBoard))
            let cardIdx = 0
            let groupIdx = -1
            board.groups.forEach((group, idx1) => {
                if (group.cards) {
                    group.cards.forEach((currCard, idx) => {
                        if (currCard.id === cardId) {
                            cardIdx = idx
                            groupIdx = idx1
                        }
                    })
                }
                if (groupIdx >= 0) board.groups[groupIdx].cards.splice(cardIdx, 1)
            })
            dispatch({ type: "updateBoard", board })
        },
        async saveList({ commit, dispatch, state }, { list }) {
            const group = state.currBoard.groups.find(group => group.id === list.id)
            commit({ type: 'updateGroup', group: list })
            const board = JSON.parse(JSON.stringify(state.currBoard))
            dispatch({ type: "updateBoard", board })
        },
        async saveLists({ dispatch, state }, { lists }) {
            const board = JSON.parse(JSON.stringify(state.currBoard))
            board.groups = lists
            dispatch({ type: "updateBoard", board })
        },

    },


}