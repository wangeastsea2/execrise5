class Base {
  constructor () {
    this.events = {}
  }
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn)
  }
  trigger(event, ...args) {
    var eventList = this.events[event] || []
    for (var i = 0; i<eventList.length; i++) {
      eventList[i].apply(this, args)
    }
  }
}

module.exports = Base