const btns = {
  view: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'primary',
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.$emit('on-view', params)
        }
      }
    }, '查看')
  },
  edit: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'primary',
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.$emit('on-edit', params)
        }
      }
    }, '编辑')
  },
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        transfer: true,
        title: '确定删除该条数据?'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'error',
          size: 'small'
        }
      }, '删除')
    ])
  }
}

export default btns
