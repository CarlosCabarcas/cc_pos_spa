<template>
  <div class="side-content-wrap">
    <div class="sidebar-left open rtl-ps-none" data-perfect-scrollbar data-suppress-scroll-x="true">
        <ul class="navigation-left">
            <li :class="{ 'nav-item': defaultClass,  'active': showInventoryMenu}" data-item="dashboard">
                <a class="nav-item-hold" @click="changeOption('inventory')">
                    <i class="nav-icon i-Check"></i>
                    <span class="nav-text">Inventario</span>
                </a>
                <div class="triangle"></div>
            </li>

            <li :class="{ 'nav-item': defaultClass, 'active': showClientsMenu }" data-item="dashboard">
                <a class="nav-item-hold" @click="changeOption('clients')">
                    <i class="nav-icon i-Business-ManWoman"></i>
                    <span class="nav-text">Clientes</span>
                </a>
                <div class="triangle"></div>
            </li>
            
            <li :class="{ 'nav-item': defaultClass, 'active': showSalesMenu }" data-item="dashboard">
                <a class="nav-item-hold" @click="changeOption('sales')">
                    <i class="nav-icon i-Cash-register-2"></i>
                    <span class="nav-text">Ventas</span>
                </a>
                <div class="triangle"></div>
            </li>
            
            <li :class="{ 'nav-item': defaultClass, 'active': showReportsMenu }" data-item="dashboard">
                <a class="nav-item-hold" @click="changeOption('reports')">
                    <i class="nav-icon i-Bar-Chart"></i>
                    <span class="nav-text">Reportes</span>
                </a>
                <div class="triangle"></div>
            </li>
        </ul>
    </div>
    <div class="sidebar-left-secondary rtl-ps-none" data-perfect-scrollbar data-suppress-scroll-x="true">
        <i class="sidebar-close i-Close"></i>
        <header>
            <div class="logo">
                <img :src="logo" alt="">
            </div>
        </header>
        <!-- Submenu Dashboards -->
        <div v-show="showInventoryMenu">
            <header>
                <h6>Inventario</h6>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <router-link :to="{ name: 'Products' }">
                        <i class="nav-icon i-Full-Basket"></i>
                        <span class="item-name">Productos</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/inventory/purchase">
                        <i class="nav-icon i-Checkout"></i>
                        <span class="item-name">Compras</span>
                    </router-link>
                </li>
            </ul>
        </div>
        
        <div v-show="showClientsMenu">
            <header>
                <h6>Terceros</h6>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <router-link to="/third/clients">
                        <i class="nav-icon i-Business-ManWoman"></i>
                        <span class="item-name">Clientes</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/third/providers">
                        <i class="nav-icon i-Business-Mens"></i>
                        <span class="item-name">Proveedores</span>
                    </router-link>
                </li>
            </ul>
        </div>
        
        <div v-show="showSalesMenu">
            <header>
                <h6>Ventas</h6>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <router-link to="/sales/point-of-sales">
                        <i class="nav-icon i-Cash-register-2"></i>
                        <span class="item-name">Punto de venta</span>
                    </router-link >
                </li>
                <li class="nav-item">
                    <router-link to="/sales/sales">
                        <i class="nav-icon i-Check"></i>
                        <span class="item-name">Ventas</span>
                    </router-link >
                </li>
            </ul>
        </div>
        
        <div v-show="showReportsMenu">
            <header>
                <h6>Reportes</h6>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <router-link to="/report/sales">
                        <i class="nav-icon i-Line-Chart"></i>
                        <span class="item-name">Reporte de ventas</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/report/purchases">
                        <i class="nav-icon i-Bar-Chart-3"></i>
                        <span class="item-name">Reporte de compras</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            logo: require("@/assets/img/logo.png"),
            showInventoryMenu: true,
            showClientsMenu: false,
            showSalesMenu: false,
            showReportsMenu: false,
            defaultClass: true
        }
    },
    methods: {
        changeOption: function(option){
            localStorage.setItem('option', option)
            switch (option) {
                case 'inventory':
                    this.showInventoryMenu = true;
                    this.showClientsMenu = false;
                    this.showSalesMenu = false;
                    this.showReportsMenu = false;
                    break;

                case 'clients':
                    this.showClientsMenu = true;
                    this.showInventoryMenu = false;
                    this.showSalesMenu = false;
                    this.showReportsMenu = false;
                    break;
                
                case 'sales':
                    this.showSalesMenu = true;
                    this.showClientsMenu = false;
                    this.showInventoryMenu = false;
                    this.showReportsMenu = false;
                    break;
                
                case 'reports':
                    this.showReportsMenu = true;
                    this.showSalesMenu = false;
                    this.showClientsMenu = false;
                    this.showInventoryMenu = false;
                    break;
            
                default:
                    break;
            }
        }
    },
    mounted() {
        let option = localStorage.getItem('option')
        this.changeOption(option);
    }
}
</script>

<style>

</style>