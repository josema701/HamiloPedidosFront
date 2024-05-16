
<template>
    <div class="container">

        <div class="text-center my-4 py-2">
            <img src="/public/login.png" alt="" class="rounded image">        
        </div>

        <div class="text-center mt-4">
            <h3>Hamilo Pedidos</h3>
            <p>Iniciar sesión</p>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-6 col-12">
                <div class="form-group">
                    <label for="email">Email ó Teléfono </label>
                    <input type="text" class="form-control" >
                    <small class="text-muted">(Para telefono, agregue el codigo de país.)</small>
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" >
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-3">
            <div class="col-md-6 col-6 p-1">
                <button class="btn btn-dark btn-block">Iniciar sesión</button>
            </div>
        </div>

        <div class="text-center mt-4">
            <p>No tienes una cuenta? <RouterLink to="/register" class="btn btn-link">Regístrate</RouterLink> </p>
        </div>

    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
.image{
    height: auto;
    width: 100%;
}

@media (min-width: 1024px) {
    .image{
        height: 30%;
        width: 30%;
    }
}

.btn-block{
    width: 100%;
}
</style>