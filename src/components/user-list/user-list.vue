<template>
<div class="user-list-wrap">
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain>添加用户</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
     <el-table-column
      label="用户状态"
      width="100">
      <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[1, 2, 3, 4]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize">
  </el-pagination>
</div>
</template>

<script>
export default {
  async created () {
    // 用户列表组件一上来就加载第一页的数据
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      pageSize: 1
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: { // 请求参数，对象会被转换为 k=v&k=v 的格式，然后拼接到请求路径 ? 后面发起请求
          pagenum: page,
          pagesize: pageSize
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}

.user-list-search {
  margin-bottom: 10px;
}
</style>
