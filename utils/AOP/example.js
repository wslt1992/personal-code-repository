

const obj = {
    ab:0,
    a:1,
    b:2,
    c:3,
    ca:4,
    log() {
        console.log(this.b)
    }
}
// obj.log = before(() => {
//     console.log(1)
//     return true
// }, val=>val, obj.log)
obj.log = before(() => {
    console.log(0)
    return Promise.resolve(0)
}, val => val.then(v=>v), before(() => console.log(1), undefined, obj.log))

obj.log = before(function () {console.log(this.a)}, undefined, after(function () {console.log(this.c)}, undefined, obj.log))
obj.log = after(function () {console.log(this.ab)}, undefined, before(function () {console.log(this.ca)}, undefined, obj.log))
obj.log()




/*function log(){
    throw 'cowu'
    console.log(a)
}
retry(3,log)()*/
