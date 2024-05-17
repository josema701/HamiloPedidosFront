<template>
    <MenuComponent />

    <div class="container">
        <h2 class="text-center mt-4">Mi carrito</h2>

        <h2 class="text-center"> Total: <b>{{ total }}</b> </h2>

        <div class="row justify-content-center">
            <div v-for="item in carrito" :key="item" class="col-12 col-md-7 m-1">
                <div class="card">
                    <div class="card-body">
                        <h4>{{ item.nombre }}</h4>
                        <div class="row">
                            <div class="col-6">
                                <b>Precio:</b> {{ item.costo }}
                            </div>
                            <div class="col-6">
                                <b>Subtotal:</b> {{ Number((item.costo * item.cantidad).toFixed(2))  }}
                            </div>

                            <div class="col-8">
                                <input type="number" :value="item.cantidad" v-on:change="actualizarCantidad(item.id, $event.target.value)" class="form-control form-control-sm">
                            </div>
                            <div class="col-4">
                                <button @click="quitarItem(item.id)" class="btn btn-dark btn-sm">-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-7 m-1">
                <div class="card mb-5">
                    <div class="card-body">
                        <textarea v-model="comentarios" cols="30" rows="2" class="form-control" placeholder="Escribenos un comentario sobre el pedido..."></textarea>
                        <div class="text-center mt-3">
                            <button @click="enviarPedido()" class="btn btn-dark">Enviar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>

<script setup>
import MenuComponent from '../components/MenuComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
 
const carrito = ref([]);
const total = ref(0);
const comentarios = ref('');
const coordenadas = ref('');
const token = ref('');
const usuario = ref({});
let urlBase = 'http://hamilopedidos.test/api';
const router = useRouter();

onMounted(() => {
    token.value = localStorage.getItem('token');
    usuario.value = JSON.parse(localStorage.getItem('usuario'));

    if(token.value == null || token.value == '' || token.value == undefined ||
        usuario.value == null || usuario.value == '' || usuario.value == undefined
    ){
        router.push({path: '/'});
    }

    carrito.value = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    calcularTotal();

    navigator.geolocation.getCurrentPosition( (posicion) => {
        // console.log(posicion.coords.latitude);
        // console.log(posicion.coords.longitude);
        coordenadas.value = posicion.coords.latitude + ',' +posicion.coords.longitude;
    });

});

const actualizarCantidad = (item_id, cantidad) => {
    console.log(cantidad);
    // actualizar el array carrito 
    carrito.value.forEach( (elemento, indice) => {
        if(elemento.id == item_id){
            carrito.value[indice].cantidad = cantidad;
        } 
    });
    calcularTotal();
}

const quitarItem = (item_id) => {
    // quitar el item del array carrito
    carrito.value = carrito.value.filter( item => item.id != item_id);
    calcularTotal();
}

const calcularTotal = () => {
    let calculado = 0;
    carrito.value.forEach( (elemento, indice) => {
        calculado = calculado + (elemento.cantidad * elemento.costo);
    });
    total.value = Number(calculado).toFixed(2);
}


const enviarPedido = async () => {

    if(total.value <= 0) {
        alert('El total no puede ser 0!');
        return;
    }

    let negocio_id = localStorage.getItem('negocio_id');

    // enviar pedido al servidor /pedidos/registrar
    let objeto = {
        cliente_id: usuario.value.id,
        negocio_id: negocio_id,
        total: total.value,
        comentarios: comentarios.value,
        coordenadas: coordenadas.value,
        detalles: carrito.value
    }

    try {
        const { data } = await axios.post(urlBase + '/pedidos/registrar', objeto, {
            Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        console.log(data);

        // limpiar el carrito, y la negocio_id
        localStorage.removeItem('carrito');
        localStorage.removeItem('negocio_id');

        router.push({path: '/inicio'});


    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>

</style>