<template>
  <div>
    <section class="section">
      <div class="card block">
        <div class="card-content">
          <p><router-link to="/admin/restaurants">For Restraunt Operators</router-link></p>
        </div>
      </div>
      <div class="card block">
        <div class="card-content">
          <p><router-link to="/r">For Consumers</router-link></p>
        </div>
      </div>
    </section>
    <section class="section" style="background-color:#cccccc">
      <div class="columns is-mobile is-centered">
        --- Test Area (for Developers) ---
      </div>

      <div class="content">
        <ol type="A">
          <div class="columns is-mobile is-left">
            <p class="p-bold">【User】</p>
          </div>
          <li><router-link to="/test/sms">SMS Auth</router-link></li>
          <li><router-link to="/r/1710478afd0304e4974">Menu</router-link></li>
          <li><router-link to="/r/1710478afd0304e4974/order/123456789/">Order</router-link></li>
          <li><router-link to="/r/1710478afd0304e4974/order/123456789/thanks">ThankYou</router-link></li>
          <div class="columns is-mobile is-left">
            <p class="p-bold" style="margin-top:2rem;">【Admin】</p>
          </div>
          <li><router-link to="/admin/restaurants/">Your Restaurant(s)</router-link></li>
          <li><router-link to="/admin/restaurants/create">Create a new Reataurant (unique restaurant Id)</router-link></li>
          <li><router-link to="/admin/restaurants/123/edit">Edit a Reataurant</router-link></li>
          <li><router-link to="/admin/restaurants/123/orders/">Orders</router-link></li>
          <li><router-link to="/admin/user/signin">Admin Signin</router-link></li>
          <li><router-link to="/admin/user/signup">Admin Signup</router-link></li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  components: {},
  data() {
    return {};
  },

  mounted() {},

  methods: {
    sessionClear() {
      alert("クリアしました");
      window.localStorage.clear();
    }
  }

  // APIcall
  // async mounted() {
  //   await this.$axios.$post('/users', { name: 'yoko' })

  //   const users = await this.$axios.$get('/users')
  //   console.log(users) // [{ id: 0, name: 'taro' }, { id: 1, name: 'yoko' }]
  // }
};
</script>

<style lang="scss">
@include mq(spmd) {
  // 引数を個別に指定
  .second_section {
    .column {
      text-align: center !important;
    }
  }
}

.second_section {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero {
  .title {
    color: rgb(255, 255, 255) !important;
    .under_line {
      background: linear-gradient(transparent 70%, #ffe600 40%);
    }
  }
}
</style>
