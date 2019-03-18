import Config from '../lib/config'

export const case1 = new Config({
  in: {
    new: { a: 'a', b: 'b'},
    old: { a: 'a', b: 'b'}
  },
  out: {}
})

export const case2 = new Config({
  in: {
    new: ['a', 'b'],
    old: ['a', 'b']
  },
  out: {}
})

export const case3 = new Config({
  in: {
    new: { a: 'a', b: 'b', c: 'c', d: 'd'},
    old: { a: 'a', b: 'b', e: 'e'}
  },
  out: {
    c: 'c',
    d: 'd',
    e: undefined
  }
})

export const case4 = new Config({
  in: {
    new: { a: 'a', b: {b1: 'b.b1',b2: 'b.b2'}, c: 'c', d: 'd'},
    old: { a: 'a', b: {b1: 'b.b1',b3: 'b.b3'}, e: 'e'}
  },
  out: {
    'b.b2': 'b.b2',
    'b.b3': undefined,
    c: 'c',
    d: 'd',
    e: undefined
  }
})

export const case5 = new Config({
  in: {
    new: { a: 'a', b: ['b[0]','b[1]'], d: 'd'},
    old: { a: 'a', b: ['b[0]','b[1]','b[2]'], c: 'c', e: 'e'}
  },
  out: {
    'b[2]': undefined,
    d: 'd',
    c: undefined,
    e: undefined
  }
})

export const case6 = new Config({
  in: {
    new: [ 'a', 'b', 'c', 'd'],
    old: [ 'a', 'b', 'e']
  },
  out: {
    '[2]': undefined,
    d: 'd',
    c: undefined,
    e: undefined
  }
})

export const case6 = new Config({
  in: {
    new: [ 'a', {b: '[0].b', c: '[1].c'}, 'c', 'd'],
    old: [ 'a', {b: '[0].b', d: '[1].d'}, 'e']
  },
  out: {
    'b[2]': undefined,
    d: 'd',
    c: undefined,
    e: undefined
  }
})