import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    // 文本框输入
    inputValue: '',
    nextId: 6,
    viewKey: 1
  },
  mutations: {
    // 异步 todoList
    initList (state, list) {
      state.list = list
    },
    // 同步 input 框输入双向绑定
    changeInputValue (state, newVal) {
      state.inputValue = newVal
    },
    // 同步 添加todoItem  修改list 并inputValue 清空
    addItem (state) {
      const params = {
        // id: state.list.length,   删除的时候id 会重复
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(params)
      state.nextId++
      state.inputValue = ''
    },
    // 同步 删除todoITem
    deleteItem (state, ID) {
      const index = state.list.findIndex(item => item.id === ID)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 修改复选框选中状态 一
    changeCheckbox2 (state, ID) {
      // 也可以通过 e.target.checked 属性
      const index = state.list.findIndex(item => item.id === ID)
      if (index !== -1) {
        // 哎呀呀---------- 通过index 找到done
        state.list[index].done = !state.list[index].done
      }
    },

    // 修改复选框选中状态  二
    changeCheckbox1 (state, params) {
      // 也可以通过 e.target.checked 属性
      const index = state.list.findIndex(item => item.id === params.id)
      if (index !== -1) {
        // 哎呀呀---------- 通过index 找到done
        state.list[index].done = params.status
      }
    },
    // 清除已完成
    cleanDone (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 清除已完成
    changeKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList: (context) => {
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成条数

    // countList: (state) => {
    //   return state.list.filter(item => item.done === false)
    // }
    count: (state) => {
      return state.list.filter(item => item.done === false).length
    },

    // 根据不同按钮来显示不同的list
    // 写到getters 里是因为 筛选的时候 不会更改 state.list  写到 Mutations  会被更改
    infoList: (state) => {
      if (state.viewKey === 2) {
        return state.list.filter(item => item.done === false)
      } else if (state.viewKey === 3) {
        return state.list.filter(item => item.done === true)
      } else {
        return state.list
      }
    }
  },
  modules: {
  }
})
