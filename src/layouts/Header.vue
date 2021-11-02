<template>
    <div class="main-header">
        <div style="margin: auto"></div>
        <div class="header-part-right">
            <div class="dropdown">
                <div class="user col align-self-end">
                    <img :src="user" id="userDropdown" width="100" alt="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="show()">
                    <div :class="{'dropdown-menu': defaultClass, 'dropdown-menu-right': defaultClass, 'show': showDropDown}" aria-labelledby="userDropdown">
                        <a class="dropdown-item" @click="logout()" type="button">Cerrar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultClass: true,
            showDropDown: false,
            user: require("@/assets/img/user-2.png")
        }
    },
    methods: {
        show: function(){
            this.showDropDown = !this.showDropDown
        },
        logout: function(){
            this.$store
            .dispatch("AUTH_LOGOUT")
            .then(() => {
                this.$router.push("/login");
            })
            .catch((error) => {
                // let data = error.data;
                console.log('error: ', error);
                this.$toastr(
                    "error",
                    "<span>alert</span>",
                    '<i class="i-Unlike text-muted header-icon"></i>  Test' 
                );
                this.loading = false;
            });
        }
    }
}
</script>

<style>

</style>