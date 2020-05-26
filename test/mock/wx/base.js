import Config from '../lib/config'

class Button {
  constructor (props) {
    this.data = function () {
      return {
        checkedImg1: 'checkedImg1'
      }
    }
    this.mixins = [
      {
        data: {
          checkedImg2: 'checkedImg2'
        }
      },
      {
        data: function () {
          return {
            checkedImg3: 'checkedImg3'
          }
        }
      }
    ]
  }
}

export const case1 = new Config({
  in: new Button(),
  out: {
    data: {
      checkedImg1: 'checkedImg1',
      checkedImg2: 'checkedImg2',
      checkedImg3: 'checkedImg3'
    }
  }
})
