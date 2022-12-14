
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.store.js'

import { store } from '../store/store'



const startingBoard = [{ "_id": "lajsd12", "title": "traco", "isStarred": true, "archivedAt": 1589983468418, "createdBy": { "_id": "u101", "fullname": "Alon Hoffman" }, "style": { "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2465x1600/560d0ec362004ae022ec06afdb2b06ef/photo-1599974579688-8dbdd335c77f.jpg", "backgroundColor": "#B04632" }, "labels": [{ "id": "l101", "title": "When possible", "color": "#7bc86c" }, { "id": "l102", "title": "Important", "color": "#f5dd29" }, { "id": "l103", "title": "", "color": "#ffaf3f" }, { "id": "l104", "title": "Urgent", "color": "#ef7564" }, { "id": "l105", "title": "", "color": "#cd8de5" }, { "id": "l106", "title": "", "color": "#5ba4cf" }], "members": [{ "_id": "u101", "fullname": "Alon Hoffman", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg" }, { "_id": "u102", "fullname": "Itai Morag", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg" }, { "_id": "u103", "fullname": "Erez Eitan", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400532/ls7fwbpl28orkpfpbgwb.jpg" }], "groups": [{ "id": "g101", "title": "BackLog", "archivedAt": 1589983468418, "cards": [{ "id": "c104", "groupId": "g101", "title": "Buy taco truck", "priority": "high", "createdBy": { "_id": "u102", "fullname": "Itai Morag" }, "checklists": [{ "id": "YEhmF", "title": "Checklist", "todos": [{ "id": "212jX", "title": "Look up best truck", "isDone": true, "editMode": false }, { "id": "5jX", "title": "find cheap equipment", "isDone": true, "editMode": false }], "newTodo": false }], "memberIds": [{ "_id": "u102", "fullname": "Itai Morag" }], "labels": ["l102"], "dueDate": { "time": 16156215211, "isCompleted": true }, "isCompleted": true, "attachments": [] }, { "groupId": "g101", "id": "c102", "title": "Find employees", "members": [{ "_id": "u101", "fullname": "Alon Hoffman", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg" }, { "_id": "u102", "fullname": "Itai Morag", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg" }], "attachments": [] }] }, { "id": "g102", "title": "ToDo", "cards": [{ "groupId": "g102", "id": "c101", "title": "Make Logo", "imgURL": "https://trello.com/1/cards/63860d3af434df009e75619b/attachments/638622d97e03e4019f8c5399/previews/638622d97e03e4019f8c53b9/download/%D7%94%D7%95%D7%A8%D7%93%D7%94.png" }, { "id": "c1534", "groupId": "g102", "title": "Look for taco truck", "imgURL": "https://trello.com/1/cards/63860ca5644759011faa16a2/attachments/63860d602444d1006e32080a/previews/63860d612444d1006e320814/download/IMG_5708__1_.jpg", "labels": ["l102"], "members": [{ "_id": "u101", "fullname": "Alon Hoffman", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg" }, { "_id": "u102", "fullname": "Itai Morag", "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg" }], "attachments": [{ "href": "http://res.cloudinary.com/mello123/image/upload/v1670414388/vrmbradwykhwrpfgeld0.png", "createdAt": 1670414388148, "type": "img", "file": null }] }, { "title": "sfsdf", "groupId": "g102", "id": "64an1x" }, { "title": "sdvsdv\n", "groupId": "g102", "id": "8DqDoC" }, { "title": "sdfsdc\n", "groupId": "g102", "id": "RL4aBI" }, { "title": "sdfsfd\n", "groupId": "g102", "id": "x6VF4J" }, { "title": "sdfsdfs\n", "groupId": "g102", "id": "O9MiB3" }, { "title": "xcvv", "groupId": "g102", "id": "6qQpD6" }, { "title": "sdfsdf\n", "groupId": "g102", "id": "mwVZPU" }, { "title": "sdfsdfs\n", "groupId": "g102", "id": "UYN1eo" }, { "title": "sdfsdfja:Lszkcnlzkzczxczxcxzczxczxczxkzzzzzz", "groupId": "g102", "id": "KdD8kt", "labels": ["l102", "l103", "l104"], "dueDate": { "time": 1670423957000, "isCompleted": false } }, { "title": "asdasdad", "groupId": "g102", "id": "M5M088" }, { "title": "awewqda\n", "groupId": "g102", "id": "1UDLky" }, { "title": "asdasda\n", "groupId": "g102", "id": "BXf8Xf" }, { "title": "asdadasdsa\n", "groupId": "g102", "id": "3OUAeh" }] }, { "id": "g123", "title": "Doing", "archivedAt": 1589983468418, "cards": [{ "id": "c103", "groupId": "g123", "title": "Research for prime locations and peak hours", "labels": ["l102", "l104"] }, { "title": "", "groupId": "g123", "id": "Foysjq" }, { "title": "qweewq", "groupId": "g123", "id": "dHF3Dz" }, { "title": "", "groupId": "g123", "id": "vnorAu" }, { "title": "zdvxdf", "groupId": "g123", "id": "UDv5ey" }, { "title": "xdvxcv", "groupId": "g123", "id": "xklLe5" }, { "title": "sdfsdf", "groupId": "g123", "id": "wQ6wvX" }, { "title": "sdfsdf\n", "groupId": "g123", "id": "5y3Ndc" }, { "title": "sdfsdf\n", "groupId": "g123", "id": "cclyYg" }, { "title": "sdfsdf\n", "groupId": "g123", "id": "awAjQ2" }, { "title": "sdfsf\n", "groupId": "g123", "id": "bBFz2a" }, { "title": "sdfsdf\n", "groupId": "g123", "id": "8v8Edt" }, { "title": "sffsdf\n", "groupId": "g123", "id": "2fvWhy" }, { "title": "sfdsdf\n", "groupId": "g123", "id": "zu9hUP" }, { "title": "sdfsdf\n", "groupId": "g123", "id": "rNlvuA" }, { "title": "cghgcghv\n", "groupId": "g123", "id": "jqN5qH" }, { "title": "", "groupId": "g123", "id": "5eWwTf" }] }, { "id": "NNj1PW", "title": "Blocked", "archivedAt": 1589983468418, "cards": [{ "id": "79ucjxzi", "groupId": "NNj1PW", "title": "Learn taco recipe", "imgURL": "https://trello.com/1/cards/63860b4384db8b03aaa58f70/attachments/6386149eb4143f0070807dc6/previews/6386149eb4143f0070807ddf/download/AU-T-10001064-Taco-Recipe_ver_2.jpg", "createdBy": { "_id": "u102", "fullname": "Itai Morag" }, "labels": ["l102"] }, { "groupId": "NNj1PW", "id": "67Ng9Q", "title": "Pass Safety Inspection", "createdBy": { "_id": "u102", "fullname": "Itai Morag" } }, { "groupId": "NNj1PW", "id": "u6Jp71", "title": "Convince mom to cook in the truck", "imgURL": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x720/de20062beee58da62ee47ad12f309837/photo-1442458370899-ae20e367c5d8.jpg", "createdBy": { "_id": "u102", "fullname": "Itai Morag" }, "checklists": [{ "title": "checklist", "id": "7j3KHj", "todos": [{ "title": "vdvcz", "isDone": true, "id": "PvD7B1", "editMode": false }, { "title": "dxvzxdc\n", "id": "b9at24", "isDone": true, "editMode": false }], "newTodo": false }] }] }, { "id": "BfaQOr", "title": "Done", "archivedAt": 1589984468418, "cards": [{ "title": "Sasdx", "groupId": "ssvx3", "id": "fkFDR7" }, { "title": "asdcasd\n", "groupId": "ssvx3", "id": "pFeYG2" }, { "title": "asdasd\n", "groupId": "ssvx3", "id": "aEvTOg" }, { "title": "assdasd\n", "groupId": "ssvx3", "id": "NFI13Y", "attachments": ["undefined file"] }] }, { "id": "2MQfpn", "title": "Done", "archivedAt": 1589984468418, "cards": [{ "title": "Sasdx", "groupId": "ssvx3", "id": "ASA3wR" }, { "title": "asdcasd\n", "groupId": "ssvx3", "id": "irEVrb" }, { "title": "asdasd\n", "groupId": "ssvx3", "id": "arY5uz" }, { "title": "assdasd\n", "groupId": "ssvx3", "id": "0yq25L", "attachments": ["undefined file"] }] }], "activities": [] }, { "_id": "5suk8", "title": "New", "isStarred": false, "archivedAt": 1670417365365, "createdBy": {}, "style": { "backgroundColor": null, "backgroundImage": "https://images.unsplash.com/photo-1619878796466-b7982b1d9263?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODcxMTR8MHwxfHNlYXJjaHwxfHxsb2NhdGlvbnN8ZW58MHx8fHwxNjcwNDMzMTE2&ixlib=rb-4.0.3&q=80" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "0DyHC", "title": "A new road", "isStarred": false, "archivedAt": 1670433172839, "createdBy": {}, "style": { "backgroundColor": null, "backgroundImage": "https://images.unsplash.com/photo-1618082976772-d6e3f7baf51f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODcxMTR8MHwxfHNlYXJjaHw3fHxsb2NhdGlvbnN8ZW58MHx8fHwxNjcwNDMzMTE2&ixlib=rb-4.0.3&q=80" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "xA5mw", "title": "My dream vacation", "isStarred": false, "archivedAt": 1670433220226, "createdBy": {}, "style": { "backgroundColor": null, "backgroundImage": "https://images.unsplash.com/photo-1606163777752-d74530c911bc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODcxMTR8MHwxfHNlYXJjaHw1fHxsb2NhdGlvbnN8ZW58MHx8fHwxNjcwNDMzMTE2&ixlib=rb-4.0.3&q=80" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "MYhPO", "title": "Home maintenance", "isStarred": false, "archivedAt": 1670433723004, "createdBy": {}, "style": { "backgroundColor": "#0079bf" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "5ysnq", "title": "Test prep", "isStarred": false, "archivedAt": 1670433885945, "createdBy": {}, "style": { "backgroundColor": "#0079bf" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "baOO7", "title": "My amazing PWA! ", "isStarred": false, "archivedAt": 1670433952198, "createdBy": {}, "style": { "backgroundColor": "#0079bf" }, "labels": [], "members": [], "groups": [], "activities": [] }, { "_id": "Ylul8", "title": "Plan high school get together", "isStarred": false, "archivedAt": 1670434274415, "createdBy": {}, "style": { "backgroundColor": "#0079bf" }, "labels": [], "members": [], "groups": [], "activities": [] }]




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
    applyDrag,
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