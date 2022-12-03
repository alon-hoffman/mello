import { boardService } from '../services/board.service'

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
    },
    getters: {
        boards({ boards }) { return boards },
        getCurrBoard(state) { return state.currBoard },
        getMembersOfBoard(state) { return state.currBoard.members },
        getLabelsOfBoard(state) { return state.currBoard.labels },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard({ boards, currBoard }) {
            const idx = boards.findIndex(c => c.id === currBoard._id)
            boards.splice(idx, 1, currBoard)
            currBoard = boardService.save(currBoard)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setBoardById(state, { _id }) {
            const board = JSON.parse(JSON.stringify(state.boards))[0];
            // const board = state.boards.find(c => c.id === _id)
            state.currBoard = board
        },
        // saveCard(state, { card }) {
        //     let cardIdx = 0
        //     let groupIdx = -1
        //     state.currBoard.groups.forEach((group, idx1) => {
        //         group.cards.forEach((currCard, idx) => {
        //             if (currCard.id === card.id) {
        //                 cardIdx = idx
        //                 groupIdx = idx1
        //             }
        //         })
        //         if (groupIdx >= 0) state.currBoard.groups[groupIdx].cards.splice(cardIdx, 1, JSON.parse(JSON.stringify(card)))
        //     })
        //     const boardIdx = state.boards.findIndex(c => c.id === state.currBoard._id)
        //     state.boards.splice(boardIdx, 1, state.currBoard)
        //     boardService.save(state.currBoard)
        // },
        saveCard(state, { card, groupId }) {
            const group = boardService.findGroupById(groupId, state.currBoard)
            if (card.id) {
                const cardIdx = group.cards.findIndex(c => c.id === card.id)
                group.cards[cardIdx] = JSON.parse(JSON.stringify(card))
            } else {
                group.cards.push(JSON.parse(JSON.stringify(card)))
            }
        },
        updateLabels(state, { labels }) {
            const newLabels = JSON.parse(JSON.stringify(labels))
            state.currBoard.labels = newLabels
            const idx = state.boards.findIndex(c => c.id === state.currBoard._id)
            state.boards.splice(idx, 1, state.currBoard)
            boardService.save(state.currBoard)
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
        async updateBoard({ commit, state }, { list }) {
            try {
                // const board = boardService.saveListToBoard(list, state.currBoard)
                commit({ type: 'updateBoard', board })
                console.log(list)
                // board = await boardService.save(board)
                // return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
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
        async addCard({ commit, dispatch }, { card, groupId }) {
            try {
                // console.log('boardStore:', card, groupId)
                commit({ type: 'saveCard', card, groupId })
                commit({ type: 'updateBoard' })
            } catch (err) {
                console.log('Error, could not Add or update list')
                throw err
            }
        },

    }
}