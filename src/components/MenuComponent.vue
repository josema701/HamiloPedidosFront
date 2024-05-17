<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button @click="regresar()" v-show="(mostrarMenu)" 
                    class="btn btn-outline-secondary btn-sm pt-0 d-block d-sm-block d-md-none">
                <span style="font-size:1.5em">&laquo;</span> Atras
            </button>

            <a class="navbar-brand" href="#">
                <img src="/public/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                HamiloPedidos
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active" aria-current="page" >Empresas</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/historial" class="nav-link" >Historial</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/perfil" class="nav-link" >Perfil</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    const router = useRouter();
    const mostrarMenu = ref(false)

    onMounted(() => {
        console.log(router.currentRoute.value.path);
         if(router.currentRoute.value.path == '/inicio'){
            mostrarMenu.value = false;
         } else {
            mostrarMenu.value = true;
         }

        console.log(mostrarMenu.value);
    });

    const regresar = () => {
        router.back();
    }
</script>