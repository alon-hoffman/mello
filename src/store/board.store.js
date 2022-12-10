import { boardService } from '../services/board-service.js'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service.js'
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from '../services/socket.service'



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
        currCard: null,
        lastActivity: null,
    },
    getters: {
        boards({ boards }) {
            return boards
        },
        getCurrBoard(state) { return state.currBoard },
        getMembersOfBoard(state) { return state.currBoard?.members },
        getLabelsOfBoard(state) { return state.currBoard.labels },
        getCard(state) {
            return state.currCard
        },
        // getGroupTitle(state) {
        //     return boardService.findGroupById(state.currCard.groupId, state.currBoard).title
        // },
        getBoardImg(state) {
            return state.currBoard.coverImg
        },
        getListById({ currBoard }, { groupId }) {
            return currBoard.groups.find(group => group.id === groupId)
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        addBoard(state, { board }) {
            board.lastUpdate = Date.now()
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const boardIdx = state.boards.find(b => b._id === board._id)
            state.boards.splice(boardIdx, 1, board)
            state.currBoard = board

        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setBoardById(state, { id }) {
            // const board = JSON.parse(JSON.stringify(state.boards))[0];
            const board = state.boards.find(b => b._id === id)
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
            const group = boardService.findGroupById(groupId, state.currBoard)
            card.id = utilService.makeId()
            group.cards.push(JSON.parse(JSON.stringify(card)))

        },
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
        },
        addActivity(state, { activity }) {
            state.lastActivity = activity
            state.currBoard.activities.unshift(activity)
        },
        archiveItem({ currBoard }, { item }) {
            currBoard.archivedItems[item.type].unshift(item)
            item.isArchived = true
        },
        retrieveItem({ currBoard }, { item }) {
            const idx = currBoard.archivedItems[item.type].findIndex(i => i.id === item.id)
            currBoard.archivedItems[item.type].splice(idx, 1)
            const itemAtBoard = currBoard.groups.find(i => i.id === item.id)
            itemAtBoard.isArchived = false
        },
        removeCardActivities({ currBoard }, { cardId }) {
            currBoard.activities = currBoard.activities.filter(activity => activity.card.id !== cardId)
        },
    },
    actions: {
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionAddBoard(board))
                return board
            } catch (err) {
                throw err
            }
        },
        async updateBoard({ commit, state }, { board }) {
            try {
                board.lastUpdate = Date.now()
                board = await boardService.save(board)
                socketService.emit(SOCKET_EMIT_BOARD_UPDATED, board)

                commit({ type: 'updateBoard', board })

            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        // async updateBoardSocket(){
        // },
        async loadBoards(context) {
            // console.log(`loadBoards = `)
            // console.log(`this.$store.$getters.loggedinUser = `, context.state.loggedinUser)
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async removeBoard(context, { boardId }) {
            // console.log(`removeBoard = `)
            try {
                await boardService.remove(boardId)
                context.commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
        async archiveList({ state, commit, dispatch }, { groupId }) {
            const group = boardService.findGroupById(groupId, state.currBoard)
            commit({ type: 'archiveItem', item: group })
            const board = JSON.parse(JSON.stringify(state.currBoard))
            dispatch({ type: "updateBoard", board })
        },
        async removeList({ dispatch, state }, { groupId }) {
            const board = JSON.parse(JSON.stringify(state.currBoard))
            const Idx = board.groups.findIndex(group => group.id === groupId)
            board.groups.splice(Idx, 1)
            dispatch({ type: "updateBoard", board })
        },
        async duplicateList({ dispatch, state }, { list }) {
            // console.log(`duplicateList = `)
            const board = JSON.parse(JSON.stringify(state.currBoard))
            const idx = board.groups.findIndex(group => group.id === list.id)
            const newList = JSON.parse(JSON.stringify(list))
            newList.id = utilService.makeId()
            newList.cards.forEach(card => {
                card.id = utilService.makeId()
            })
            board.groups.splice(idx, 0, newList)
            dispatch({ type: "updateBoard", board })
        },
        addCard({ dispatch, commit, state }, { card }) {
            card.id = utilService.makeId()
            card.type = 'card'
            let board = JSON.parse(JSON.stringify(state.currBoard))
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
            list.type = 'list'
            const board = JSON.parse(JSON.stringify(state.currBoard))
            board.groups.push(list)
            dispatch({ type: "updateBoard", board })
        },
        async saveCard({ dispatch, state }, { card, groupId }) {
            // console.log(`saveCard = `)
            // console.log(`card = `, card)
            const board = JSON.parse(JSON.stringify(state.currBoard))
            const groupIdx = board.groups.findIndex((group) => group.id === card.groupId)
            const cardIdx = board.groups[groupIdx].cards.findIndex((currCard) => currCard.id === card.id)
            board.groups[groupIdx].cards.splice(cardIdx, 1, JSON.parse(JSON.stringify(card)))
            dispatch({ type: "updateBoard", board })
        },
        async removeCard({ dispatch, state, commit }, { cardId }) {
            commit({ type: 'removeCardActivities', cardId })
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
            // console.log(`saveList = `, list)
            list.cards.forEach((card) => {
                if (card.groupId !== list.id) card.groupId = list.id
            })
            // const group = state.currBoard.groups.find(group => group.id === list.id)
            // console.log(`saveList = `,group)

            commit({ type: 'updateGroup', group: list })
            const board = JSON.parse(JSON.stringify(state.currBoard))
            dispatch({ type: "updateBoard", board })
        },
        async saveLists({ dispatch, state }, { lists }) {
            // console.log(`saveLists = `)
            const board = JSON.parse(JSON.stringify(state.currBoard))
            board.groups = lists
            dispatch({ type: "updateBoard", board })
        },
        addActivity({ commit, state }, { activity }) {
            const { card, action, detail } = activity
            const activityToAdd = {
                id: utilService.makeId(),
                card: {
                    id: card?.id,
                    title: card?.title
                },
                title: boardService.activityNamer(action, state.currBoard, card, detail),
                addedAt: Date.now(),
                user: userService.getLoggedinUser()?.fullName || 'Guest'
            }
            if (!card.activities) card.activities = []
            card.activities.unshift(activityToAdd)
            commit({ type: 'addActivity', activity: activityToAdd })
        },
        retrieveItem({ commit, dispatch, state }, { item }) {
            commit({ type: 'retrieveItem', item })
            const board = JSON.parse(JSON.stringify(state.currBoard))
            dispatch({ type: 'updateBoard', board })
        }
    },
}

