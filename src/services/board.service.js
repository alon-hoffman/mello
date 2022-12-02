
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.store.js'

import { store } from '../store/store'



const startingBoard = [
    {
        "title": "traco",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Alon",
            "imgUrl": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2465x1600/560d0ec362004ae022ec06afdb2b06ef/photo-1599974579688-8dbdd335c77f.jpg"
        },
        "style": {},
        "labels": [
            {
                "_id": "l101",
                "title": "When possible",
                "color": "#d6ecd2"
            },
            {
                "_id": "l102",
                "title": "Important",
                "color": "#faf3c0"
            },
            {
                "_id": "l103",
                "title": "",
                "color": "#fce6c6"
            },
            {
                "_id": "l104",
                "title": "Urgent",
                "color": "#f5d3ce"
            },
            {
                "_id": "l105",
                "title": "",
                "color": "#eddbf4"
            },
            {
                "_id": "l106",
                "title": "",
                "color": "#bcd9ea"
            },
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Alon Hoffman",
                "imgUrl": "https://www.google.com"
            },
            {
                "_id": "u102",
                "fullname": "Itai Morag",
                "imgUrl": "https://www.google.com"
            },
            {
                "_id": "u103",
                "fullname": "Erez Eitan",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "BackLog",
                "archivedAt": 1589983468418,
                "cards": [
                    {
                        "id": "c101",
                        "title": "Make Logo",
                        "imgURL": "https://trello.com/1/cards/63860d3af434df009e75619b/attachments/638622d97e03e4019f8c5399/previews/638622d97e03e4019f8c53b9/download/%D7%94%D7%95%D7%A8%D7%93%D7%94.png"

                    },
                    {
                        "id": "c102",
                        "title": "Find employees",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Alon Hoffman",
                                "imgUrl": "https://www.google.com"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Itai Morag",
                                "imgUrl": "https://www.google.com"
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
                        "title": "Research for prime locations and peak hours",
                        "labels": ["l102", "l104"]
                    },
                    {
                        "id": "c104",
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
                        "dueDate": 16156215211,
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
                        "title": "Look for taco truck",
                        "imgURL": "https://trello.com/1/cards/63860ca5644759011faa16a2/attachments/63860d602444d1006e32080a/previews/63860d612444d1006e320814/download/IMG_5708__1_.jpg",
                        "labels": ["important"],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Alon Hoffman",
                            },
                            {
                                "_id": "u102",
                                "fullname": "Itai Morag",
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
                        "id": "c15skdj",
                        "title": "Pass Safety Inspection",
                        "createdBy": {
                            "_id": "u102",
                            "fullname": "Itai Morag",
                        }
                    },
                    {
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
                        "title": "Stress test employees",
                        "imgURL": "https://trello-backgrounds.s3.amazonaws.com/Shared…eba801f64257/photo-1604208485423-f19bc2aaae2d.jpg",
                        "createdBy": {
                            "_id": "u102",
                            "fullname": "Itai Morag",
                        }
                    },
                    {
                        "id": "nalksjdl",
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
    getEmptyBoard,
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
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




