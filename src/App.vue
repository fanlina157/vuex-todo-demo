<template>
  <div id="app">
    <!-- 不使用v-model 是 不直接操作inputValue  -->
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="changeValue" />
    <a-button type="primary" @click="addTodoItem">添加事项</a-button>
    <!-- 这里换成infoList  getters 包装过的 -->
    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- 选中与未选中 -->
        <a-checkbox :checked="item.done" @change="changeCheckbox(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteTodoItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{count}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 1 ? 'primary' : 'default'" @click="searchList(1)">全部</a-button>
          <a-button :type="viewKey === 2 ? 'primary' : 'default'"  @click="searchList(2)">未完成</a-button>
          <a-button :type="viewKey === 3 ? 'primary' : 'default'"  @click="searchList(3)">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="deleteAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      // list: []  // 不使用私有的，使用state 中的
    }
  },
  computed: {
    ...mapState(['inputValue', 'list', 'viewKey']),
    ...mapGetters(['count', 'infoList'])
  },
  methods: {
    changeValue (e) {
      // console.log(e.target.value)
      this.$store.commit('changeInputValue', e.target.value)
    },
    addTodoItem () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('不能为空')
      }
      this.$store.commit('addItem')
    },
    deleteTodoItem (ID) {
      // alert(ID)
      this.$store.commit('deleteItem', ID)
    },
    changeCheckbox (ID) {
      // alert(ID)
      this.$store.commit('changeCheckbox', ID)
    },
    deleteAll () {
      this.$store.commit('cleanDone')
    },
    searchList (key) {
      this.$store.commit('changeKey', key)
    }
  },
  created () {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
