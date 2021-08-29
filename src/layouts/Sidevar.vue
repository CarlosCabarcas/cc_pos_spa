<template>
  <div class="side-content-wrap">
    <div class="sidebar-left open rtl-ps-none" data-perfect-scrollbar data-suppress-scroll-x="true">
        <ul class="navigation-left">
            <li :class="{ 'nav-item': defaultClass,  'active': showInventoryMenu}" data-item="dashboard">
                <a class="nav-item-hold" href="#" @click="changeOption('inventory')">
                    <i class="nav-icon i-Bar-Chart"></i>
                    <span class="nav-text">Inventario</span>
                </a>
                <div class="triangle"></div>
            </li>

            <li :class="{ 'nav-item': defaultClass, 'active': showClientsMenu }" data-item="dashboard">
                <a class="nav-item-hold" href="#" @click="changeOption('clients')">
                    <i class="nav-icon i-Bar-Chart"></i>
                    <span class="nav-text">Clientes</span>
                </a>
                <div class="triangle"></div>
            </li>
            
            <li :class="{ 'nav-item': defaultClass, 'active': showSalesMenu }" data-item="dashboard">
                <a class="nav-item-hold" href="#" @click="changeOption('sales')">
                    <i class="nav-icon i-Bar-Chart"></i>
                    <span class="nav-text">Ventas</span>
                </a>
                <div class="triangle"></div>
            </li>
            
            <li :class="{ 'nav-item': defaultClass, 'active': showReportsMenu }" data-item="dashboard">
                <a class="nav-item-hold" href="#" @click="changeOption('reports')">
                    <i class="nav-icon i-Bar-Chart"></i>
                    <span class="nav-text">Ventas</span>
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
                <p>Lorem ipsum dolor sit.</p>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <a href="dashboard1.html">
                        <i class="nav-icon i-Clock-3"></i>
                        <span class="item-name">Productos</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="dashboard2.html">
                        <i class="nav-icon i-Clock-4"></i>
                        <span class="item-name">Compras</span>
                    </a>
                </li>
            </ul>
        </div>
        
        <div v-show="showClientsMenu">
            <header>
                <h6>Clientes</h6>
                <p>Lorem ipsum dolor sit.</p>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <a href="dashboard1.html">
                        <i class="nav-icon i-Clock-3"></i>
                        <span class="item-name">Registro de clientes</span>
                    </a>
                </li>
            </ul>
        </div>
        
        <div v-show="showSalesMenu">
            <header>
                <h6>Ventas</h6>
                <p>Lorem ipsum dolor sit.</p>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <a href="dashboard1.html">
                        <i class="nav-icon i-Clock-3"></i>
                        <span class="item-name">Punto de venta</span>
                    </a>
                </li>
            </ul>
        </div>
        
        <div v-show="showReportsMenu">
            <header>
                <h6>Reportes</h6>
                <p>Lorem ipsum dolor sit.</p>
            </header>
            <ul class="childNav">
                <li class="nav-item">
                    <a href="dashboard1.html">
                        <i class="nav-icon i-Clock-3"></i>
                        <span class="item-name">Reporte de ventas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="dashboard1.html">
                        <i class="nav-icon i-Clock-3"></i>
                        <span class="item-name">Reporte de compras</span>
                    </a>
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
    }
}
</script>

<style>

</style>