<template>
  <div class="login">
    <h1>欢迎登录宝洁SFA系统</h1>
    <div class="top-hat"></div>
    <div class="login-box">
      <!-- logo -->
      <!-- 处理外边距合并 -->
      <div class="logo-warp">
        <div class="logo-box"></div>
      </div>
      <!-- 登陆表单 -->
      <!-- validate表单验证 -->
      <div
        class="input-group"
        :class="{ active: act_index === 1, error: errors.has('cno') }"
      >
        <label for="cm_code">公司编号：</label>
        <input
          name="cno"
          v-validate="{ required: true, max: 6, min: 4 }"
          @focus="act_index = 1"
          type="number"
          id="cm_code"
          v-model="cm_code"
        >
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 2, error: errors.has('pno') }"
      >
        <label for="PNO">员工编号：</label>
        <input
          name="pno"
          v-validate="{ required: true, max: 12, min: 4 }"
          @focus="act_index = 2"
          type="number"
          id="PNO"
          v-model="PNO"
        >
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 3, error: errors.has('pwd') }"
      >
        <label for="Passwd">用户密码：</label>
        <input
          name="pwd"
          v-validate="{ required: true, max: 12, min: 6 }"
          @focus="act_index = 3"
          type="password"
          id="Passwd"
          v-model="passwd"
        >
      </div>

      <!-- 保存密码与自动登录 -->
      <div class="checkbox-row">
        <div
          class="checkbox-wrap"
          @click="remembSet"
          :class="{ active: rememb }"
        >
          <i
            class="iconfont"
            :class="{ 'icon-check-square': rememb,'icon-border': !rememb }"
          ></i>
          <span>记住密码</span>
        </div>

        <div
          class="checkbox-wrap"
          @click="autoLogionSet"
          :class="{ active: autologin }"
        >
          <i
            class="iconfont"
            :class="{ 'icon-check-square': autologin,'icon-border': !autologin }"
          ></i>
          <span>自动登录</span>
        </div>

      </div>
    </div>

    <div
      class="btn-wrap"
      @click="loginBtnClick"
    >
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";

import "../assets/font/iconfont.css";
import { setTimeout } from "timers";
export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      PNO: "",
      passwd: "",
      rememb: false, // 记住密码
      autologin: false // 自动登录
    };
  },
  mounted() {
    // 强制执行所有校验
    this.$validator.validate();
  },
  methods: {
    autoLogionSet() {
      // 设置当前的autologin为true或者false
      this.autologin = !this.autologin;
      // 另外设置rememb的值
      this.autologin && (this.rememb = true);
    },
    remembSet() {
      this.rememb = !this.rememb;
      this.rememb || (this.autologin = false);
    },
    loginBtnClick() {
      // 判断当前是否校验全部通过
      // this.errors.any(); // boolean 如果有错那么返回 true，否则 false
      if (this.errors.any()) {
        console.log("校验未通过");
        return;
      }
      console.log("校验通过");

      // 弹出等待的遮挡层，防止二次点击
      Indicator.open("正在登录...");

      // 发送ajax请求，axios
      axios
        .post("http://localhost:3002/api/login", {
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.passwd
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log("登陆失败", e);
          Indicator.close();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// 局部引用
// @import "../lib/hotcss/px2rem.scss";

.login {
  background-color: #2ade69;
  height: 100%;

  h1 {
    width: 100%;
    text-align: center;
    font-size: px2rem(36);
    height: px2rem(36);
    padding: px2rem(148- 36 - 44) 0 px2rem(44) 0;
    line-height: px2rem(36);
    color: #fff;
  }

  .top-hat {
    width: px2rem(537);
    height: px2rem(18);
    background-color: #eee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }

  @mixin login_wrap {
    width: px2rem(600);
    background-color: #fff;
    margin: 0 auto;
    border-radius: px2rem(20);
  }

  .login-box {
    @include login_wrap;
    height: px2rem(826);
    .logo-warp {
      padding: px2rem(80) 0;
      .logo-box {
        width: px2rem(190);
        height: px2rem(190);
        margin: 0 auto;
        background-image: url("../assets/logo.jpg");
        background-size: cover;
      }
    }

    @mixin rowStyle {
      padding: 0 px2rem(36);
      color: $text-color;
      width: px2rem(401);
    }

    .input-group {
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      font-size: $text-size-mid;
      line-height: px2rem(90);
      @include rowStyle();
      margin: 0 auto px2rem(30);
      input {
        border: none;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(200);
        padding-left: 1em;
      }
    }
    .input-group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    .input-group.error {
      color: red;
      border: 2px solid red;
    }

    .checkbox-row {
      font-size: $text-size;
      @include rowStyle();
      display: flex;
      justify-content: space-around;
      .checkbox-wrap {
        padding-top: px2rem(8);
        padding-left: px2rem(36);
        i::before {
          display: inline-block;
          height: px2rem(30);
          width: px2rem(30);
          font-size: px2rem(30);
        }
      }
      .checkbox-wrap.active {
        color: $act-color;
      }
    }
  }

  .btn-wrap {
    @include login_wrap;
    font-weight: 700;
    letter-spacing: px2rem(10); // 设置字间距
    height: px2rem(100);
    text-align: center;
    line-height: px2rem(100);
    font-size: $text-size-imp;
    color: $act-color;
    margin-top: px2rem(20);
  }
}
</style>