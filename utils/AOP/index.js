function before(beforeFn, beforePredicate, fn) {
    return function (...args) {
        if (beforePredicate && typeof beforePredicate !== 'function') {
            throw new Error('beforePredicate must be a function')
        }
        if (!beforeFn) {
            throw new Error('beforeFn must be require')
        }
        if (typeof beforeFn !== 'function') {
            throw new Error('beforeFn must be a function')
        }
        if (!fn) {
            throw new Error('fn must be require')
        }
        if (typeof fn !== 'function') {
            throw new Error('fn must be a function')
        }
        const beforeResult = beforeFn();
        if (beforePredicate && !beforePredicate(beforeResult)) {
            // beforePredicate返回了false
            return false
        }
        // 怎么把前中后三个值都返回？
        return fn(...args)
    }
}

function after(afterFn, afterPredicate, fn) {
    return function (...args) {
        if (!afterFn) {
            throw new Error('afterFn must be require')
        }
        if (afterFn && typeof afterFn !== 'function') {
            throw new Error('afterFn must be a function')
        }
        if (!fn) {
            throw new Error('fn must be require')
        }
        if (typeof fn !== 'function') {
            throw new Error('fn must be a function')
        }
        const result = fn(...args)
        if (afterPredicate && !afterPredicate(result)) {
            // afterPredicate 返回了false
            return result
        }
        const afterResult = afterFn(result)
        // 怎么把前中后三个值都返回？
        return afterResult === undefined ? result : afterResult
    }
}

// export {before, after}


const obj = {
    log() {
        console.log(2)
    }
}
// obj.log = before(() => {
//     console.log(1)
//     return true
// }, val=>val, obj.log)
// obj.log = before(() => {
//     console.log(0)
//     return true
// }, val => val, before(() => console.log(1), undefined, obj.log))
obj.log = after(() => console.log(3), undefined, before(() => console.log(1), undefined, obj.log))
// obj.log()
obj.log = before(() => console.log(0), undefined, after(() => console.log(4), undefined, obj.log))
// obj.log()
obj.log()
