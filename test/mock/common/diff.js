import Config from '../lib/config'

// String
export const case1 = new Config({
  in: {
    new: 'string',
    old: ''
  },
  out: 'string'
})

// Number
export const case2 = new Config({
  in: {
    new: 2,
    old: 3
  },
  out: 2
})

// Boolean
export const case3 = new Config({
  in: {
    new: true,
    old: false
  },
  out: true
})

// null
export const case4 = new Config({
  in: {
    new: {},
    old: null
  },
  out: {}
})

// undefined
export const case5 = new Config({
  in: {
    new: null,
    old: undefined
  },
  out: null
})

// Object
export const case8 = new Config({
  in: {
    new: { a: 'a', b: 'b'},
    old: { a: 'a', b: 'b'}
  },
  out: {}
})

export const case8_1 = new Config({
  in: {
    new: { a: 'a', b: 'b', c: 'c', d: 'd'},
    old: { a: 'a', b: 'b', e: 'e'}
  },
  out: {
    c: 'c',
    d: 'd',
    e: ''
  }
})

export const case8_2 = new Config({
  in: {
    new: { a: 'a', b: {b1: 'b.b1',b2: 'b.b2', 1: '1'}, c: 'c', d: 'd', 1: '1'},
    old: { a: 'a', b: {b1: 'b.b1',b3: 'b.b3'}, e: 'e'}
  },
  out: {
    'b.b2': 'b.b2',
    'b.b3': '',
    'b[1]': '1',
    c: 'c',
    d: 'd',
    e: '',
    '[1]': '1'
  }
})

export const case8_3 = new Config({
  in: {
    new: { a: 'a', b: ['b[0]','b[1]'], d: 'd'},
    old: { a: 'a', b: ['b[0]','b[1]','b[2]'], c: 'c', e: 'e'}
  },
  out: { a: 'a', b: ['b[0]','b[1]'], d: 'd'}
})

// Array
export const case9 = new Config({
  in: {
    new: ['a', 'b'],
    old: ['a', 'b']
  },
  out: {}
})

export const case9_1 = new Config({
  in: {
    new: [ 'a', {b: '[0].b', c: '[1].c'}, 'c', 'd'],
    old: [ 'a', {b: '[0].b', d: '[1].d'}, 'e']
  },
  out: {
    '[1].c': '[1].c',
    '[1].d': '',
    '[2]': 'c',
    '[3]': 'd'
  }
})

export const case9_2 = new Config({
  in: {
    new: [ 'a', {b: '[0].b', c: '[1].c'}],
    old: [ 'a', {b: '[0].b', d: '[1].d'}, 'e']
  },
  out: [ 'a', {b: '[0].b', c: '[1].c'}]
})

export const case9_3 = new Config({
  in: {
    new: [ 'a', 'b', 'c', 'd'],
    old: [ 'a', 'b', 'e']
  },
  out: {
    '[2]': 'c',
    '[3]': 'd'
  }
})

export const case9_4 = new Config({
  in: {
    new: {
        "a": 1, "b": 2, "c": "str", "d": { "e": [2, { "a": 4 }, 5] }, "f": true, "h": [1], "g": { "a": [1, 2], "j": 111 }
    },
    old: {
        "a": [], "b": "aa", "c": 3, "d": { "e": [3, { "a": 3 }] }, "f": false, "h": [1, 2], "g": { "a": [1, 1, 1], "i": "delete" }, "k": "del"
    }
  },
  out: { "a": 1, "b": 2, "c": "str", "d.e[0]": 2, "d.e[1].a": 4, "d.e[2]": 5, "f": true, "h": [1], "g.a": [1, 2], "g.j": 111, "g.i": "", "k": "" }
})