<template>
    <MenuComponent/>    

    <div class="container">
        <div class="card text-white shadow">
            <img :src="negocio.imagen" class="card-img img-negocio" alt="...">
            <div class="card-img-overlay text-center">
                <h5 class="card-title mt-5">{{ negocio.nombre }}</h5>
                <p class="card-text">{{ negocio.descripcion }}</p>
            </div>
        </div>

        <div class="row justiy-content-center mt-3">
            <div v-for="item in productos" :key="item" class="col-md-4 col-12">

                <div class="card text-dark shadow m-1">
                    <div class="row g-0">
                        <div class="col-4">
                            <img :src="item.imagen" class="img-fluid rounded-start mt-2" alt="...">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ item.nombre }}</h5>
                                <p class="card-text">{{ item.descripcion }}</p>
                                <div class="row">
                                    <div class="col-8">
                                        <p class="card-text"><b>Precio: </b> {{ item.costo }} </p>
                                    </div>
                                    <div class="col-4">
                                        <button @click="agregarCarrito(item)" class="btn btn-light btn-sm">+</button>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-12 text-center mb-3">
                <button @click="cargarMas()" class="btn btn-light mt-5 mb-5">Cargar más</button>
            </div>
        </div>

        <div v-if="carrito.length > 0" class="floating">
            <button @click="verCarrito()" class="btn btn-dark" >Mi carrito <b>({{ carrito.length }})</b> </button>
        </div>

    </div>
</template>

<script setup>
    import MenuComponent from '../components/MenuComponent.vue';


    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    let urlBase = 'http://hamilopedidos.test/api';

    const negocio = ref({});
    const productos = ref([]);
    const siguienteUrl = ref(null);
    const carrito = ref([]);

    const router = useRouter();

    let negocio_id = router.currentRoute.value.params.id;

    onMounted( () => {
        // limpiar el localStorage carrito
        localStorage.removeItem('carrito');
        localStorage.setItem('negocio_id', negocio_id);

        cargarDatos();
    });

    const cargarDatos = async () => {
        // console.log(negocio_id);
        try {
            const { data } = await axios.get(urlBase + '/productos/' + negocio_id);
            productos.value = data.datos.data;
            siguienteUrl.value = data.datos.next_page_url;
            negocio.value = data.negocio;
        } catch (error) {
            console.log(error);
        }
    }

    const cargarMas = async () => {
        if(siguienteUrl.value == null || siguienteUrl.value == ''){
            alert('No hay mas productos para mostrar!');
            return;
        }
        try {
            const { data } = await axios.get(siguienteUrl.value);
            productos.value.push(...data.datos.data);
            siguienteUrl.value = data.datos.next_page_url;
        } catch (error) {        
            console.log(error);
        }
    }

    const agregarCarrito = (item) => {
        // verificar que el item no exista en el carrito
        let existe =carrito.value.find((elemento) => {
            return elemento.id == item.id;
        });
        if(existe != undefined){
            // aumentar la cantidad
            existe.cantidad++;
        } else {
            // agregar el item al carrito
            item.cantidad = 1;
            item.producto_id = item.id;
            carrito.value.push(item);
        }
    }
    
    const verCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito.value));
        router.push({path: '/carrito'});
    }
</script>

<style scoped>
.card-img-overlay {
    background-color: rgba(0, 0, 0, 0.4);
}

.floating {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 5px;
    /* top: 40%; */
    bottom: 5px;
    right: 5px;
}

.floating > button {
    width: 100%;
}

@media (min-width: 1024px) {
    .floating {
        left: 20vw;
        right: 20vw;
    }
    .img-negocio {
        height: 200px;
        object-fit: cover;
        width: 100%;
    }
}

</style>