<template>
    <Transition name="modal-animation">
        <div v-if="modalActive" class="mainModal">
            <div @click="close" class="modalOverlay" v-on:click="TraceEvent('close',  $store.state.id)"></div>
            <div :style="{backgroundColor: 'var(--iris-color'+randomNumber+')'}" class="modalContent">
                <div 
                    @click="close" 
                    class="closeButton"
                    v-on:click="TraceEvent('close',  $store.state.id)"
                    >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>
import { Transition } from 'vue'
import axios from 'axios'

export default {
    props: ["modalActive"],
    data(){
        return{
            randomNumber: 1
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        randomColor(){
            this.randomNumber = Math.floor((Math.random() * 5) + 2)
            console.log(this.randomNumber)
        },
        TraceEvent(id, user_id) {
            this.emitter.emit('TraceClick', {'id': id, 'user_id': user_id})

            this.eventLogTrace(id, user_id)
        },
        eventLogTrace: async function (id, user_id ) {
      try {

        const payload = {
          description: id,
          user_id: user_id
        }

        const url = this.baseURL + '/traces';
        const data = await axios.post(url, payload)
        console.log('response', data);
      } catch (error) {
        console.log('This Error eventLogTrace', error)
      }
    },
    },
    components: { Transition },
    mounted(){
        this.randomColor()
    }
}
</script>

<style lang="scss">
.mainModal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;

    .modalContent{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        max-width: 550px;
        padding: 20px;
        transform: translate(-50%, -50%);
        background-color: var(--iris-color1);
        color: white !important;

        h5{
            width: calc(100% - 60px);
        }

        h3,
        h5 {
            color: white !important;
            font-weight: normal;
            margin: 0;
        }

        .closeButton{
            position: absolute;
            top: 20px;
            right: 20px;
            text-align: center;
            cursor: pointer;
            font-size: 24px;
        }
        
        .details{
            margin: 20px 0;

            li{
                list-style: none;
                text-align: right;
            }
        }

        .buttons{
            margin: 30px 0 20px;
            text-align: center;
            
        }
    }
    
}

.modalOverlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
} 

.modal-animation-enter-active,
.modal-animation-leave-active{
    transition: opacity .3s ease-in-out;
}

.modal-animation-enter-from,
.modal-animation-leave-to{
    opacity: 0;
}





.modal-info-enter-active,
.modal-info-leave-active{
    transition: all .2s ease-in-out;
}

.modal-info-delay-enter-active,
.modal-info-delay-leave-active{
    transition: all .2s ease-in-out;
    transition-delay: .4s;
}

.modal-info-enter-from,
.modal-info-leave-to,
.modal-info-delay-enter-from,
.modal-info-delay-leave-to{
    opacity: 0;
    transform: translateX(5%);
}
</style>