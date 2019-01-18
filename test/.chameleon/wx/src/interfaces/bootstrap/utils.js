

export function validOptions(options) {
  let validList = [
    {
      name: 'app',
      message: `调用chameleon bootstrap方法时，请传入app`
    },
    {
      name: 'store',
      message: `调用chameleon bootstrap方法时，请传入store`
    },
    {
      name: 'routerConfig',
      message: `调用chameleon bootstrap方法时，请传入routerConfig`
    },
    {
      name: 'router',
      message: `调用chameleon bootstrap方法时，请传入router`
    }
  ]

  validList.forEach(item=>{
    if(!options[item.name]) {
      throw new Error(item.message)
    }
  })

} 