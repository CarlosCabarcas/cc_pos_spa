<template>
    <div class="auth-layout-wrap" :style="cssProps">
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-5">
                            <div class="auth-logo text-center mb-4"><img :src="logo" alt=""></div>
                            <h1 class="mb-3 text-18">Inicio de sesión</h1>
                            <form @submit.stop.prevent="login">
                                <div class="form-group">
                                    <label for="email">Usuario</label>
                                    <input class="form-control form-control-rounded"
                                            id="email" 
                                            type="email"
                                            v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Contraseña</label>
                                    <input class="form-control form-control-rounded" 
                                            id="password" 
                                            type="password"
                                            v-model="password">
                                </div>
                                <button type="submit" 
                                        class="btn btn-rounded btn-primary btn-block mt-2"
                                        :disabled="showLoading"
                                        >Iniciar sesión</button>

                                <div v-once class="typo__p" v-if="showLoading">
                                    <div class="spinner sm spinner-primary mt-3"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            cssProps: {
                backgroundImage: `url(${require('@/assets/img/photo-wide-4.jpg')})`,
            },
            logo: require("@/assets/img/logo.png"),
            loading: false
        }
    },
    computed: {
        showLoading() {
            return this.loading;
        }
    },
    methods: {
        login: function () {
            this.loading = true;
            this.$store
            .dispatch("AUTH_REQUEST", {
                email: this.email,
                password: this.password,
            })
            .then(() => {
                this.$router.push("/");
            })
            .catch((error) => {
                // let data = error.data;
                console.log('error: ', error);
                this.$toastr.e("USUARIO O CONTRASEÑA INVALIDOS");
                this.loading = false;
            });
        }
    }
}
</script>


<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
.auth-logo-2 img {
  height: 100px;
}
</style>