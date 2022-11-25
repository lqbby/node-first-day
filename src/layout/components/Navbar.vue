<template>
    <div class="title">
       <div class="left">
        <img src="http://likede2-admin.itheima.net/img/logo.3673fab5.png" alt="">
      </div>
      <div class="right">
        <div class="avatar">
          <img src="data:image/png;base64,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" alt="">
        </div>
        <div class="content">欢迎您，{{ $store.getters.name }}</div>
        <div class="logout" @click="logout">退出<i class="el-icon-caret-bottom"></i></div>
      </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateUser } = createNamespacedHelpers('user')
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    ...mapStateUser(['userInfo']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$store.dispatch('user/removeToken')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  height: 60px;
  width: 100%;
  background-color: #5373e0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABwEAAAA8CAYAAACOysV5AAADG0lEQVR4nO3aR04DURBF0bYHhPWxFDbMLggDjIQEIjh0+O2uqn/OEt70vt3D49NhAAAA4Crub/fD3c3O2AAAAKxqb14AAIDreX59H17efDEBAABYlwgIAABwZUIgAAAAaxMBAQAANiAEAgAAsCYREAAAYCNCIAAAAGsRAQEAADYkBAIAALAGERAAAGBjQiAAAACtiYAAAAABCIEAAAC0JAICAAAEIQQCAADQiggIAAAQiBAIAABACyIgAABAMEIgAAAAS4mAAAAAAQmBAAAALCECAgAABCUEAgAAMJcICAAAEJgQCAAAwBwiIAAAQHBCIAAAAFOJgAAAAAkIgQAAAEwhAgIAACQhBAIAADCWCAgAAJCIEAgAAMAYIiAAAEAyQiAAAACXiIAAAAAJCYEAAACcIwICAAAkJQQCAABwiggIAACQmBAIAADAMSIgAABAckIgAAAAf4mAAAAABQiBAAAA/CQCAgAAFCEEAgAA8EUEBAAAKEQIBAAAYBABAQAA6hECAQAAEAEBAAAKEgIBAAD6JgICAAAUJQQCAAD0SwQEAAAoTAgEAADokwgIAABQnBAIAADQHxEQAACgA0IgAABAX0RAAACATgiBAAAA/RABAQAAOiIEAgAA9EEEBAAA6IwQCAAAUJ8ICAAA0CEhEAAAoDYREAAAoFNCIAAAQF0iIAAAQMeEQAAAgJpEQAAAgM4JgQAAAPWIgAAAAAiBAAAAxYiAAAAAfBICAQAA6hABAQAA+CYEAgAA1CACAgAA8IsQCAAAkJ8ICAAAwD9CIAAAQG4iIAAAAEcJgQAAAHmJgAAAAJwkBAIAAOQkAgIAAHCWEAgAAJCPCAgAAMBFQiAAAEAuIiAAAACjCIEAAAB5iIAAAACMJgQCAADkIAICAAAwiRAIAAAQnwgIAADAZEIgAABAbCIgAAAAswiBAAAAcYmAAAAAzCYEAgAAxCQCAgAAsIgQCAAAEI8ICAAAwGJCIAAAQCwiIAAAAE0IgQAAAHGIgAAAADQjBAIAAMQgAgIAANCUEAgAALA9ERAAAIDmhEAAAIANDcPwAWT/XbLChBneAAAAAElFTkSuQmCC) ;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  padding: 9px 20px 0;
  .left {
    width: 100px;
    img {
      width: 100%;
    }
  }
  .right {
    display: flex;
    margin-top: -5px;
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 10px;
      background-color: #fff;
      .img{
        width: 100%;
      }
    }
    .content {
      padding-top: 18px;
      margin-left: 10px;
      color: aliceblue;
    }
    .logout {
      line-height: 60px;
      margin-left: 60px;
      margin-right: 30px;
      color: aliceblue;
    }
  }
}
</style>
