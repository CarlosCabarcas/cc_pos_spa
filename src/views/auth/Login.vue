<template>
    <div class="auth-layout-wrap" :style="cssProps">
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-5">
                            <div class="auth-logo text-center mb-4"><img :src="logo" alt=""></div>
                            <h1 class="mb-3 text-18">Sign In</h1>
                            <form>
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input class="form-control form-control-rounded" id="email" type="email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control form-control-rounded" id="password" type="password">
                                </div>
                                <button class="btn btn-rounded btn-primary btn-block mt-2">Sign In</button>
                            </form>
                            <!-- <div class="mt-3 text-center"><a class="text-muted" href="forgot.html">
                                    <u>Forgot Password?</u></a></div> -->
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
            cssProps: {
                backgroundImage: `url(${require('@/assets/img/photo-wide-4.jpg')})`,
            },
            logo: require("@/assets/img/logo.png")
        }
    }
}
</script>