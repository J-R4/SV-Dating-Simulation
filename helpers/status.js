function downStatus(hearts) {
    if (hearts === 1) {
        return `Stranger`
    } else if (hearts === 5) {
        return `Friend`
    } else if (hearts <= 0) {
        return `Enemy`
    } else if (hearts <= 4) {
        return `Friend`
    } else if (hearts === 8) {
        return `Close Friend`
    }
}

function upStatusWM(hearts) {
    if (hearts <= 0) {
        return `Cold Friend`
    }
    
    if (hearts < 5) {
        return `Friend`
    }

    if (hearts >= 8) {
        return `Girlfriend`
    } 
    
    if (hearts = 5) {
        return `Close Friend`
    }
    
}

function upStatusM(hearts) {
    if (hearts <= 0) {
        return `Cold Friend`
    }
    
    if (hearts < 5) {
        return `Friend`
    }
    
    if (hearts >= 8) {
        return `Boyfriend`
    } 
    
    if (hearts = 5) {
        return `Close Friend`
    }
}

module.exports = {upStatusWM,upStatusM,downStatus}