
<template>
    <div class="container">

        <div class="text-center my-2 py-2">
            <img src="/public/register.png" alt="" class="rounded image">        
        </div>

        <div class="text-center mt-2">
            <h3>Hamilo Pedidos</h3>
            <p>Regístrate</p>
        </div>

        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <label for="name">Nombre completo </label>
                    <input v-model="name" type="text" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="email">Email </label>
                    <input v-model="email" type="email" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono </label>
                    <input v-model="telefono" type="text" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input v-model="password" type="password" id="password" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Confirmar contraseña</label>
                    <input v-model="password_confirmation" type="password" class="form-control" >
                </div>
            </div>
        </div>
        

        <div class="row justify-content-center mt-3">
            <div class="col-6 p-1">
                <button @click="registrar()" class="btn btn-dark btn-block">Regístrate</button>
            </div>
        </div>

        <div class="text-center mt-4">
            <p>Ya tienes una cuenta? <RouterLink to="/login" class="btn btn-link">Iniciar sesión</RouterLink> </p>
        </div>

    </div>
</template>

<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import axios from 'axios';
    import { ref } from 'vue';


    let urlBase = 'http://hamilopedidos.test/api';

    const name = ref('');
    const email = ref('');
    const telefono = ref('');
    const password = ref('');
    const password_confirmation = ref('');

    const router = useRouter();

    const registrar = async() => {
        if(name.value == '' || email.value == '' || telefono.value == ''
             ||password.value == '' || password_confirmation.value == ''){
            alert('Llene todos los campos');
            return;
        }

        try {
            const { data } = await axios.post(urlBase + '/register', {
                                    name: name.value,
                                    email: email.value,
                                    telefono: telefono.value,
                                    password: password.value,
                                    password_confirmation: password_confirmation.value,
                                },{
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                    }
                                });
            let usuario = data.usuario;
            let token = data.token;

            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('token', token);

            router.push({path: '/verificar'});
        } catch (error){
            console.log(error);
        }
    }

</script>

<style scoped>
.image{
    height: auto;
    width: 60%;
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