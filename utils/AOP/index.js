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
            throw new Error('beforeFn is require')
        }
        if (typeof beforeFn !== 'function') {
            throw new Error('beforeFn must be a function')
        }
        if (!fn) {
            throw new Error('fn is require')
        }
        if (typeof fn !== 'function') {
            throw new Error('fn must be a function')
        }
        beforeFn = beforeFn.bind(this)
        fn = fn.bind(this)
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
            throw new Error('afterFn is require')
        }
        if (afterFn && typeof afterFn !== 'function') {
            throw new Error('afterFn must be a function')
        }
        if (!fn) {
            throw new Error('fn is require')
        }
        if (typeof fn !== 'function') {
            throw new Error('fn must be a function')
        }
        afterFn = afterFn.bind(this)
        fn = fn.bind(this)
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

/**
 * 错误重试
 */
function retry(count,fn){
    if (!fn) {
        throw new Error('fn is require')
    }
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function')
    }

    let index =0
    function execute(){
        fn = fn.bind(this)
        try {
            return fn()
        }catch (err){
            if(index++<count){
                execute()
            }
            throw Error(
                '重试多次失败'+err.toString()
            )
        }
    }
    return execute
}

function iif(predicate,trueResult,falseResult){
    return function(...args){
        trueResult = trueResult.bind(this)
        falseResult = falseResult.bind(this)
        return predicate(...args)?trueResult(...args):falseResult(...args)
    }
}
export {before, after,retry,iif}
