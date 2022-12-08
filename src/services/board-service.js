
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const KEY = 'boards_db'
const BOARD_URL = 'board/'

// _createBoards()

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    activityNamer,
    findGroupById,
    applyDrag

}

function query(filterBy) {
    return httpService.get(BOARD_URL, filterBy)
    // return storageService.query(KEY)
}

function getById(boardId) {
    return httpService.get(BOARD_URL + boardId)
    // return storageService.get(KEY, boardId)
}

function remove(boardId) {
    return httpService.delete(BOARD_URL + boardId)
    // return storageService.remove(KEY, boardId)
}

function save(board) {
    if (board._id) return httpService.put(BOARD_URL + board._id, board)
    return httpService.post(BOARD_URL, board)
    // if (board._id) return storageService.put(KEY, board)
    // return storageService.post(KEY, board)
}
function getEmptyBoard(newBoard) {
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

function activityNamer(action, board, card) {
    const group = findGroupById(card.groupId, board)
    const activityMap = {
        addCard: { before: `Added`, after: `to ${group.title}` },
        removeCard: { before: `Removed`, after: `from ${group.title}` },
    }
    return activityMap[action]
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

function _createBoards() {
    let boards = utilService.loadFromStorage(KEY)
    if (!boards || !boards.length) {
        boards = [
            {
                "_id": "lajsd12",
                "title": "traco",
                "isStarred": false,
                "archivedAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Alon Hoffman",
                },
                "style": {
                    "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2465x1600/560d0ec362004ae022ec06afdb2b06ef/photo-1599974579688-8dbdd335c77f.jpg",
                    "backgroundColor": "#B04632"
                    // "coverColor": "#FFFFFF",
                },
                "labels": [
                    {
                        "id": "l101",
                        "title": "When possible",
                        "color": "#7bc86c",
                        // "backgroundColor":"#d6ecd2"
                    },
                    {
                        "id": "l102",
                        "title": "Important",
                        "color": "#f5dd29",
                        // "backgroundColor":"#faf3c0"
                    },
                    {
                        "id": "l103",
                        "title": "",
                        "color": "#ffaf3f",
                        // "backgroundColor":"#fce6c6"
                    },
                    {
                        "id": "l104",
                        "title": "Urgent",
                        "color": "#ef7564",
                        // "backgroundColor":"#f5d3ce"
                    },
                    {
                        "id": "l105",
                        "title": "",
                        "color": "#cd8de5",
                        // "backgroundColor":"#eddbf4"
                    },
                    {
                        "id": "l106",
                        "title": "",
                        "color": "#5ba4cf",
                        // "backgroundColor":"#bcd9ea"
                    },
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Alon Hoffman",
                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg"
                    },
                    {
                        "_id": "u102",
                        "fullname": "Itai Morag",
                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg"
                    },
                    {
                        "_id": "u103",
                        "fullname": "Erez Eitan",
                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400532/ls7fwbpl28orkpfpbgwb.jpg"
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "BackLog",
                        "archivedAt": 1589983468418,
                        "cards": [
                            {
                                "groupId": "g101",
                                "id": "c101",
                                "title": "Make Logo",
                                "imgURL": "https://trello.com/1/cards/63860d3af434df009e75619b/attachments/638622d97e03e4019f8c5399/previews/638622d97e03e4019f8c53b9/download/%D7%94%D7%95%D7%A8%D7%93%D7%94.png"

                            },
                            {
                                "groupId": "g101",
                                "id": "c102",
                                "title": "Find employees",
                                "members": [
                                    {
                                        "_id": "u101",
                                        "fullname": "Alon Hoffman",
                                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg"
                                    },
                                    {
                                        "_id": "u102",
                                        "fullname": "Itai Morag",
                                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg"
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        "id": "g102",
                        "title": "ToDo",
                        "cards": [
                            {
                                "id": "c103",
                                "groupId": "g102",
                                "title": "Research for prime locations and peak hours",
                                "labels": ["l102", "l104"]
                            },
                            {
                                "id": "c104",
                                "groupId": "g102",
                                "title": "Buy taco truck",
                                "priority": "high",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                },
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "Look up best truck",
                                                "isDone": false
                                            },
                                            {
                                                "id": "5jX",
                                                "title": "find cheap equipment",
                                                "isDone": true
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [{
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                }],
                                "labels": ["l102"],
                                "dueDate": {
                                    time: 16156215211,
                                    isCompleted: false
                                },
                            }
                        ],

                    },
                    {
                        "id": "g123",
                        "title": "Doing",
                        "archivedAt": 1589983468418,
                        "cards": [
                            {
                                "id": "c1534",
                                "groupId": "g123",
                                "title": "Look for taco truck",
                                "imgURL": "https://trello.com/1/cards/63860ca5644759011faa16a2/attachments/63860d602444d1006e32080a/previews/63860d612444d1006e320814/download/IMG_5708__1_.jpg",
                                "labels": ["l102"],
                                "members": [
                                    {
                                        "_id": "u101",
                                        "fullname": "Alon Hoffman",
                                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400597/pqqzgegaqywvcmovvroq.jpg"
                                    },
                                    {
                                        "_id": "u102",
                                        "fullname": "Itai Morag",
                                        "imgUrl": "https://res.cloudinary.com/mello123/image/upload/v1670400586/ujrglkfvggsttcuk6t5l.jpg"
                                    },
                                ]


                            },
                        ]
                    },
                    {
                        "id": "g1asd",
                        "title": "Blocked",
                        "archivedAt": 1589983468418,
                        "cards": [
                            {
                                "groupId": "g1asd",
                                "id": "c15skdj",
                                "title": "Pass Safety Inspection",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                }
                            },
                            {
                                "groupId": "g1asd",
                                "id": "askjdkj",
                                "title": "Convince mom to cook in the truck",
                                "imgURL": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x720/de20062beee58da62ee47ad12f309837/photo-1442458370899-ae20e367c5d8.jpg",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                }
                            },
                        ]
                    },
                    {
                        "id": "bjkhlk44",
                        "title": "QA",
                        "archivedAt": 1589984468418,
                        "cards": [
                            {
                                "id": "jvlvhlv",
                                "groupId": "bjkhlk44",
                                "title": "Stress test employees",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                }
                            },
                            {
                                "id": "nalksjdl",
                                "groupId": "bjkhlk44",
                                "title": "Check spiciness",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                }
                            },
                        ]
                    },
                    {
                        "id": "ssvx3",
                        "title": "Done",
                        "archivedAt": 1589984468418,
                        "cards": [
                            {
                                "id": "79ucjxzi",
                                "groupId": "ssvx3",
                                "title": "Learn taco recipe",
                                "imgURL": "https://trello.com/1/cards/63860b4384db8b03aaa58f70/attachments/6386149eb4143f0070807dc6/previews/6386149eb4143f0070807ddf/download/AU-T-10001064-Taco-Recipe_ver_2.jpg",
                                "createdBy": {
                                    "_id": "u102",
                                    "fullname": "Itai Morag",
                                },
                                "labels": ["l102"],
                            },
                        ]
                    },
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "card": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ],

            }
        ]
        utilService.saveToStorage(KEY, boards)
    }
    return boards
}
