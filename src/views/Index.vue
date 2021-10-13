<template>
  <div class="Box">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          @select="sel"
        >
          <el-menu-item index="/admin/home/">
            <i class="el-icon-menu"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu :index="v.path" v-for="(v, i) in data.slice(1)" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ v.title }}</span>
            </template>
            
              <el-menu-item
              :index="item.path"
              v-for="(item) in v.children"
              :key="item.path"
              v-show="!item.children"
            >
                {{ item.title }}
            </el-menu-item>

                  <el-submenu :index="item.path"
                  v-for="(item) in v.children"
                  :key="item.path+'i'"
                  v-show="item.children"
                  >
                  <template slot="title">{{ item.title }}</template>
                  <el-menu-item v-for="(item2,index2) in item.children" :key='index2' :index="item2.path">{{item2.title}}</el-menu-item>
                </el-submenu>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <div class="headerList">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(v, i) in breadcrumbList" :key="i"
                >首页</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      defaultActive: "",
      breadcrumbList: [],
    };
  },
  methods: {
    sel(index, indexPath) {
      console.log(index, indexPath);
      console.log(this.$router.currentRoute.meta);
      this.breadcrumbList = this.$router.currentRoute.meta.data;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.breadcrumbList = this.$router.currentRoute.meta.data;
    this.defaultActive = this.$router.currentRoute.path;
    let data = JSON.parse(sessionStorage.getItem("LeftList"));

    console.log(data);
    this.data = data;
  },
};
</script>

<style lang='less'>
.Box {
  width: 100%;
  height: 100%;
}
.headerList {
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>    