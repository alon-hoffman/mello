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
        user: userService.getLoggedinUser()?.fullname || 'Guest'
    }
    if (!card.activities) card.activities = []
    card.activities.unshift(activityToAdd)
    commit({ type: 'addActivity', activity: activityToAdd })
},

function activityNamer(action, board, card, detail) {
    const group = card.groupId ? findGroupById(card.groupId, board) : {}
    const activityMap = {
        addCard: { before: ` added`, after: ` to ${group.title}` },
        removeCard: { before: ` removed`, after: ` from ${group.title}` },
        dateComplete: { before: ` marked the due date on`, after: ` complete` },
        dateIncomplete: { before: ` marked the due date on`, after: ` incomplete` },
        addDetail: { before: ` added ${detail} to`, after: `` },
        removeDetail: { before: ` removed ${detail} from`, after: `` },
        todo: { before: ` completed ${detail} from`, after: `` },
        archiveItem: { before: ` archived ${card ? detail : ''}` },
        retrieveItem: { before: ` sent ${card ? detail : ''}`, after: ` to the board` },
        addComment: { before: ` commented on`, after: `: ${detail}` },
        removeList: { before: ` removed list ${group.title}`, after: `` },
    }
    return activityMap[action]
}

removeActivity({ currBoard }, { activityId }){
    const activityIdx = currBoard.activities.findIndex(activity => activity.id === activityId)
    currBoard.activities.splice(activityIdx, 1)
},