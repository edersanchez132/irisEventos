<template>
     <div class="head">
          <Router-link :to="{ path: createLinkMapa('mapa', event.ubicacionID, event.ubicacion, event.imagen_map) }">
            <div class="head" :style="{ backgroundImage: `url(${event.imagen_map})` }">
            </div>
          </Router-link>
        </div>
</template>

<script>
export default {
    
    data() {
        return {
          
        }
    },
    mounted() {
        
    },
    methods: {
        createLinkMapa(page, id, name, imagen_map) {

            let link = `/${page}/${id}/`
            switch (id) {
                case 100:
                    link = link + 'Laboratorio-Génesis-1'
                    break;
                case 103:
                    link = link + 'Laboratorio-Génesis-2'
                    break;
                case 106:
                    link = link + 'Laboratorio-Génesis-3'
                    break;
                case 124:
                    link = link + '300k'
                    break;
                case 124:
                    link = link + '300k'
                    break;
                case 121:
                    link = link + 'Visionarium'
                    break;
                case 118:
                    link = link + 'Rincón-Micelium'
                    break;
                case 115:
                    link = link + 'Nido'
                    break;
                case 112:
                    link = link + 'Punto-ATP'
                    break;
                case 109:
                    link = link + 'Esquina-Alfa'
                    break;
                default:
                    break;
            }

            return link
        },
    }
}
</script>