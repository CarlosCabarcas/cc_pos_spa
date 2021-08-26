<template>  
    <div class="app-admin-wrap layout-sidebar-compact sidebar-dark-purple sidenav-open clearfix">
        <Sidebar />
        <div class="main-content-wrap d-flex flex-column">
            <Header />
            <div class="main-content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../layouts/Sidevar.vue'
import Header from '../layouts/Header.vue'

export default {
    components: {
        Sidebar,
        Header
    }
}
</script>
