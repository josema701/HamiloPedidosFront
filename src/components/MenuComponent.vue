<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
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
    import { RouterLink } from 'vue-router';
</script>