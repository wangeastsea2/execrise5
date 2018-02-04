// function Base() {}
// Base.extend = function () {}

// module.exports = Base
//
var slice = [].slice

function merge(target) {
    // 非常常见的技巧
    var srcs = slice.call(arguments, 1)
    srcs.forEach(function (src) {
        for (var key in src) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            if (src.hasOwnProperty(key)) {
                target[key] = src[key]
            }
        }
    })
    // 现在有可能这么遍历Object的key
    // Object.keys(object).forEach((key) => {
    //     // TODO
    // })
}

function Base() {
    this.events = {}
}
Base.extend = function (proto, static) {
    var Super = this
    function Cur() {
        Super.call(this)
    }
    var Pile = function () {}
    Pile.prototype = this.prototype
    Cur.prototype = new Pile()
    merge(Cur.prototype, proto)
    merge(Cur, Super, static)
    return Cur
}
merge(Base.prototype, {
    on: function (event, fn) {
        (this.events[event] = this.events[event] || [])
            .push(fn)
    },
    trigger: function (event) {
        var args = slice.call(arguments, 1)
        ;(this.events[event] || [])
            .forEach((fn) => {
                fn.apply(this, args)
            })
    }
})

module.exports = Base