
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.store.js'

import { store } from '../store/store'




function activitySorter(action, board, card) {
    const group = findGroupById(card.groupId, board)
    const activityMap = {
        addCard: `Added ${card.title} to ${group.title}`,
        removeCard: `Removed ${card.title} from ${group.title}`
    }
    return activityMap[action]
}


const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')


    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.commit(ev.data)
        })
    })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    findGroupById,
    applyDrag,
    activitySorter,
}
window.cs = boardService


async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    }
    //XXX for developing proposes
    if (!boards || !boards.length) return startingBoard
    return boards

}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = _makeBoard(board)
        savedBoard = await storageService.post(STORAGE_KEY, savedBoard)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function _makeBoard(newBoard) {
    return {
        "_id": utilService.makeId(),
        "title": newBoard.title,
        "isStarred": false,
        "archivedAt": Date.now(),
        "createdBy": {},
        "style": {
            backgroundColor: newBoard.backgroundColor,
            backgroundImage: newBoard.backgroundImg
        },
        "labels": [],
        "members": [],
        "groups": [],
        "activities": [],
    }
}


function findGroupById(groupId, board) {
    return board.groups.find(group => group.id === groupId)
}

function applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}