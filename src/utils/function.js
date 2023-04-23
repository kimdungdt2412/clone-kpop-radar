export function isPendingAction(action) {
    return action.type.endsWith('/pending')
}


export function isRejectedAction(action) {
    return action.type.endsWith('/rejected')
}

export function isFulfilledAction(action) {
    return action.type.endsWith('/fulfilled')
}