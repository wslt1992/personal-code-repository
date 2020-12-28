/**
 *
 * @param beforeFn function
 * @param beforePredicate Promise|function
 * @param fn function
 * @returns {function(...[*]): Promise<boolean|*>}
 */
function before(beforeFn, beforePredicate, fn) {
    return async function (...args) {
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
        if (beforePredicate && !await beforePredicate(beforeResult)) {
            // beforePredicate返回了false
            return false
        }
        // 怎么把前中后三个值都返回？
        return fn(...args)
    }
}

/**
 *
 * @param afterFn
 * @param afterPredicate Promise|function
 * @param fn
 * @returns {function(...[*]): Promise<*>}
 */
function after(afterFn, afterPredicate, fn) {
    return async function (...args) {
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
        if (afterPredicate && !await afterPredicate(result)) {
            // afterPredicate 返回了false
            return result
        }
        const afterResult = afterFn(result)
        // 怎么把前中后三个值都返回？
        return afterResult === undefined ? result : afterResult
    }
}

export {before, after}
