<template>
    <MenuComponent />

    <div class="container">
        <h2 class="text-center mt-4">Mi perfil</h2>

        <div class="row justify-content-center">

            <div class="col-12 col-md-7 m-1">
                <div class="form-group mb-3">
                    <label for="">Nombre completo</label>
                    <div class="form-control">{{ usuario.name }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="">Correo</label>
                    <div class="form-control">{{ usuario.email }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="">Telfono</label>
                    <div class="form-control">{{ usuario.telefono }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="">Fecha registro</label>
                    <div class="form-control">{{ usuario.created_at }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="">Verificado</label>
                    <div class="form-control">
                        <span v-if="usuario.verificado" class="text-success">Verficado</span>
                        <span v-else class="text-danger">No verficado</span>
                    </div>
                </div>

                <div class="text-center">
                    <button @click="salir()" class="btn btn-dark">Cerrar sesión</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import MenuComponent from '../components/MenuComponent.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const token = ref('');
const usuario = ref({});
const router = useRouter();

onMounted(() => {
    token.value = localStorage.getItem('token');
    usuario.value = JSON.parse(localStorage.getItem('usuario'));

    if(token.value == null || token.value == '' || token.value == undefined ||
        usuario.value == null || usuario.value == '' || usuario.value == undefined
    ){
        router.push({path: '/'});
    }
});

const salir = () => {
    localStorage.clear();
    router.push({path: '/'});
}
</script>

<style scoped>

</style>