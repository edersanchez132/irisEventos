<template>

    <div class="searchBar">
        <div class="input-group mb-5">
            <input type="search" class="form-control" v-model='searchQuery' placeholder="Buscar..."
                aria-label="Recipient's username" aria-describedby="button-addon2">
        </div>
    </div>
    <Loading v-if="isLoadingTable" />
    <table id="tableComponent" class="table table-bordered table-striped align-items-center">
        <thead>
            <tr>
                <th v-for="field in fieldsTittle" :key='field' @click="sortTable(field)">
                    {{ field }} <i class="fa-solid fa-sort"></i>
                </th>
            </tr>
        </thead>
        <tbody>
            <!-- Loop through the list get the each student data -->
            <tr v-for="(item, index ) in filteredList">
                <td>{{ item.id }}</td>
                <td>{{ item.event_name }}</td>
                <td>{{ item.event_description }}</td>
                <td>{{ item.event_location }}</td>
                <td>{{ item.event_date_start }}</td>
                <td>{{ item.event_date_end }}</td>
                <td>
                    <div v-if="item.activo == 1">
                        <div class="form-check form-switch text-align-center">
                            <input class="form-check-input text-align-center" type="checkbox"
                                id="flexSwitchCheckDefault" checked @click="btnDisabled(item)">
                            <Loading v-if="isLoadingCheck" />
                        </div>
                    </div>
                    <div v-if="item.activo == 0" class="text-align-center">
                        <div class="form-check form-switch text-align-center">
                            <input class="form-check-input text-align-center" type="checkbox"
                                id="flexSwitchCheckDefault" @click="btnDisabled(item)">
                            <Loading v-if="isLoadingCheck" />
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <a class="icon-margin">
                        <i class="fa-solid fa-pen-to-square blue link" @click="modalVisible(index)"></i>
                        <ModalEdit @close="toggleModal" :modalEdith="modalEdith">
                        <h5>DATOS DEL EVENTO</h5>
                        <br>
                        <div class="container">
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="eventname" class="form-label">Nombre del Evento</label>
                                        <input type="hidden" class="form-control" v-model="id" />
                                        <input type="hidden" class="form-control" v-model="activo" />
                                        <input type="text" class="form-control" v-model="event_name" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="LocalizacionEvento" class="form-label">Localización del
                                            Evento</label>
                                        <input type="text" class="form-control" v-model="event_location" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="numeroLugares" class="form-label">Número de Lugares</label>
                                        <input type="number" class="form-control" v-model="event_number_places_total" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="datestart" class="form-label">Fecha de Inicio</label>
                                        <input type="datetime-local" class="form-control" v-model="event_date_start" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="datend" class="form-label">Fecha de Fin</label>
                                        <input type="datetime-local" class="form-control" v-model="event_date_end" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="objetivoEvento" class="form-label">Objetivo del Evento</label>
                                        <textarea type="text" class="form-control"
                                            v-model="event_objective"> </textarea>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="ExpectativaEvento" class="form-label">Expectativa del
                                            Evento</label>
                                        <textarea type="text" class="form-control"
                                            v-model="event_expectation"> </textarea>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="DescripcionEvento" class="form-label">Descripción del
                                            Evento</label>
                                        <textarea type="text" class="form-control"
                                            v-model="event_description"> </textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="ImagenEvento" class="form-label">Imágen del Evento</label>
                                        <div class="text-align-center">
                                            <img alt="avatar" class="form-control" :src="event_image_event" width="230"
                                                height="250" />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="file" name="event" accept="image/*" @change="onFileChangeEvent" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="ImagenEventoLocalizacion" class="form-label">Imágen de
                                            Localización
                                            del Evento</label>
                                        <div class="text-align-center">
                                            <img alt="avatar" class="form-control" :src="event_image_location"
                                                width="230" height="250" />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="file" name="location" accept="image/*"
                                            @change="onFileChangeLocation" />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="ImagenMapa" class="form-label">Imágen de Mapa</label>
                                        <div class="text-align-center">
                                            <img alt="avatar" class="form-control" :src="event_image_map" width="230"
                                                height="250" />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="file" name="map" accept="image/*" @change="onFileChangeMap" />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button type="button" class="btn mr-1 btn-primary btn-lg" v-if="isUpdate"
                                @click="getEventInfoUpdate()">Actualizar</button>
                            <Modal @close="toggleModalActive" :modalActive="modalActive">
                                <div v-if="eventInfoUpdate">
                                    <div>
                                        <h5>¿Estás seguro de que quieres actualizar tus datos?</h5>
                                        <h2 class="big">{{ event_name }}</h2>
                                        <Loading v-if="isLoadingTable" />
                                    </div>
                                    <div class="buttons" v-if="isButton">
                                        <button class="btn-sec btn-circle" @click="toggleModalActive">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                        <button class="btn-main btn-circle" @click.prevent="handleSubmitForm()">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </ModalEdit>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { defineComponent, computed, ref } from 'vue'
import { sortBy } from 'lodash'
import Moment from 'moment'
import UserService from '../services/user.service'
import AuthService from "../services/auth-header"

import ModalEdit from '@/components/Common/ModalEdit.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'

export default defineComponent({
    name: 'ComponentsTable',
    components: {
        ModalEdit, Loading, Modal
    },
    props: {
        studentData: {
            type: Array,
        },
        fieldsTittle: {
            type: Array,
        },
        fieldsData: {
            type: Array,
        }
    },
    setup(props) {
        let sort = ref(false)
        let updatedList = ref([])
        let searchQuery = ref("")

        // a function to sort the table
        const sortTable = (col) => {
            sort.value = true
            // Use of _.sortBy() method
            updatedList.value = sortBy(props.studentData, col)
        }

        const isImage = (col) => {
            return (String(col).indexOf('.png') != -1)
        }

        const isActive = (col) => {
            return String(col) == 'activo'
        }

        const sortedList = computed(() => {
            if (sort.value) {
                return updatedList.value
            }
            else {
                return props.studentData;
            }
        });
        // Filter Search
        const filteredList = computed(() => {
            return sortedList.value.filter((product) => {
                return (
                    product.created_at.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
                    product.event_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
                    product.event_description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
                    product.event_location.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
                    product.activo.toString().indexOf(searchQuery.value.toLowerCase()) != -1 ||
                    product.id.toString().indexOf(searchQuery.value.toLowerCase()) != -1
                );
            });
        });

        return {
            sortedList,
            sortTable,
            searchQuery,
            filteredList,
            isImage,
            isActive,
        }
    },
    data() {
        return {
            isLoadingCheck: false,
            isLoadingTable: false,
            allowClose: true,
            modalEdith: false,
            submitted: false,
            filteredList: [],
            fileEventUpdate: '',
            fileLocationUpdate: '',
            fileMapUpdate: '',
            isUpdate: true,
            eventInfoUpdate: false,
            modalActive: false,
            isButton: true,
            isLoadingCheckFalse: false
        }
    },
    mounted() { 
        if (localStorage.getItem('token')) {
            AuthService()
          
            } else {
            this.$router.push('/')
        }
    },
    methods: {
        async btnDisabled(item) {

            this.isLoadingCheck = true
            this.isButton = false

            await UserService.updateEvent(item).then((response) => {

                this.isLoadingCheck = false
                location.reload()

            }).catch(error => {
                console.log('This Error updateEvent', error)
            })

        },
        onFileChangeEvent(e) {

            let image_event = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_event)
            reader.onload = e => {
                this.fileEventUpdate = e.target.result
            }
        },
        onFileChangeLocation(e) {

            let image_location = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_location)
            reader.onload = e => {
                this.fileLocationUpdate = e.target.result
            }
        },

        onFileChangeMap(e) {

            let image_map = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_map)
            reader.onload = e => {
                this.fileMapUpdate = e.target.result
            }
        },
        getEventInfoUpdate() {
            this.modalActive = true
            this.eventInfoUpdate = true
            //this.eventInfoUpdate = this.id
        },
        getEventInfoCheck() {
            this.modalActive = true
            this.eventInfoCheck = true
            //this.eventInfoUpdate = this.id
        },
        async handleSubmitForm() {

            this.isLoadingTable = true
            this.isUpdate = false
            this.isButton = false
            const eventData = {
                id: this.id,
                active: this.activo,
                event_name: this.event_name,
                event_location: this.event_location,
                event_number_places_total: this.event_number_places_total,
                event_objective: this.event_objective,
                event_expectation: this.event_expectation,
                event_description: this.event_description,
                event_image_event: this.fileEventUpdate,
                event_image_location: this.fileLocationUpdate,
                event_image_map: this.fileMapUpdate,
                event_date_start: Moment(this.event_date_start).format('YYYY-MM-DD HH:mm'),
                event_date_end: Moment(this.event_date_end).format('YYYY-MM-DD HH:mm'),
            }

            await UserService.updateEventData(eventData).then((response) => {

                this.isLoadingTable = false
                this.modalEdith = false
                location.reload()

            }).catch(error => {
                console.log('This Error updateEvent', error)
            })

        },

        modalVisible: function (id) {

            this.isLoadingTable = true

            this.id = this.filteredList[id].id
            this.event_name = this.filteredList[id].event_name
            this.event_location = this.filteredList[id].event_location
            this.event_number_places_total = this.filteredList[id].event_number_places_total
            this.event_objective = this.filteredList[id].event_objective
            this.event_expectation = this.filteredList[id].event_expectation
            this.event_description = this.filteredList[id].event_description
            this.event_image_event = this.filteredList[id].event_image
            this.event_image_location = this.filteredList[id].event_image_location
            this.event_image_map = this.filteredList[id].event_image_map
            this.activo = this.filteredList[id].activo
            this.event_date_start = this.filteredList[id].event_date_start
            this.event_date_end = this.filteredList[id].event_date_end
            this.toggleModal()
            this.isLoadingTable = false

        },

        toggleModal() {
            if (this.allowClose) {
                this.modalEdith = !this.modalEdith
                if (!this.modalEdith) {
                    this.modalID = null
                    clearTimeout(this.cancelTimeOut)
                }
            }
        },
        toggleModalActive() {
            if (this.allowClose) {
                this.modalActive = !this.modalActive
                if (!this.modalActive) {
                    this.modalID = null
                    clearTimeout(this.cancelTimeOut)
                }
            }
        },
        toggleModalCheck() {

            if (this.allowClose) {
                this.modalActive = !this.modalActive
                if (!this.modalActive) {
                    this.modalID = null
                    clearTimeout(this.cancelTimeOut)
                }
            }

        },

        watch: {

        }
    },

})
</script>
<style scoped>
table th:hover {
    background: #f2f2f2;
}

.mainModal .modalContent h5 {
    width: calc(100% - 5px) !important;
}
</style>