<template>
    <Loading v-if="isLoading" />
    <div class="container text-center  mt-5 mb-5">
        <h1 class="mt-5 fw-bolder text-success "> Eventos </h1>
        <div class="table-responsive my-5">
            <ComponentsTable :fieldsTittle='fieldsTittle' :studentData="studentData"></ComponentsTable>
            <button type="button" class="btn btn-primary" @click="btnSetNew()">Nuevo Evento</button>
            <ModalNew @close="toggleModalNew" :modalNew="modalNew">
                <div class="container">
                    <div class="row">
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="eventname" class="form-label">Nombre del Evento</label>
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
                                <input type="number" class="form-control" v-model="event_number_places_total"  required/>
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
                                <textarea type="text" class="form-control" v-model="event_objective"> </textarea>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="ExpectativaEvento" class="form-label">Expectativa del
                                    Evento</label>
                                <textarea type="text" class="form-control" v-model="event_expectation"> </textarea>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="DescripcionEvento" class="form-label">Descripción del
                                    Evento</label>
                                <textarea type="text" class="form-control" v-model="event_description"> </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="ImagenEvento" class="form-label">Imágen del Evento</label>
                                <div class="text-align-center">
                                    <img alt="avatar" class="form-control" width="230" height="250" />
                                </div>
                            </div>
                            <div>
                                <input type="file" name="event" accept="image/*" @change="onFileSaveEvent" />
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="ImagenEventoLocalizacion" class="form-label">Imágen de
                                    Localización
                                    del Evento</label>
                                <div class="text-align-center">
                                    <img alt="avatar" class="form-control" width="230" height="250" />
                                </div>
                            </div>
                            <div>
                                <input type="file" name="location" accept="image/*" @change="onFileSaveLocation" />
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="ImagenMapa" class="form-label">Imágen de Mapa</label>
                                <div class="text-align-center">
                                    <img alt="avatar" class="form-control" width="230" height="250" />
                                </div>
                            </div>
                            <div>
                                <input type="file" name="map" accept="image/*" @change="onFileSaveMap" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <button type="button" class="btn mr-1 btn-primary btn-lg" v-if="isNew"
                        @click="getEventInfoSave()">Guardar</button>
                    <Modal @close="toggleModalActiveSave" :modalActive="modalActive">
                        <div v-if="eventInfoSave">
                            <div>
                                <h5>¿Estás seguro de que quieres guardar los datos?</h5>
                                <h2 class="big">{{ event_name }}</h2>
                                <Loading v-if="isLoadingTable" />
                            </div>
                            <div class="buttons" v-if="isButton">
                                <button class="btn-sec btn-circle" @click="toggleModalActiveSave">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                                <button class="btn-main btn-circle" @click.prevent="saveNewEvent()">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </ModalNew>
        </div>
    </div>
</template>
<script>

import ModalNew from '@/components/Common/ModalNew.vue'
import Loading from '@/components/Loading.vue'
import Modal from '@/components/Modal.vue'
import Moment from 'moment'
import ComponentsTable from '../../components/ComponentsTable.vue'
import UserService from '../../services/user.service'
import AuthService from "../../services/auth-header"

// *** envar los datos del strinsearc al compoente de la tabla para que se pueda filtrar *** hacer mañana // 
export default {
    name: 'IrisEvents',
    components: {
        ComponentsTable, Loading, Modal, ModalNew
    },
    data() {
        return {
            studentData: [],
            fieldsTittle: ['id', 'Nombre Evento', 'Descripción Evento', 'Localización Evento', 'Fecha Inicio', 'Fecha Fin', 'Activo', 'Actualizar'],
            isLoading: false,
            allowClose: true,
            modalNew: false,
            isNew: true,
            eventInfoSave: false,
            modalActive: false,
            isButton: true,
            isLoadingTable: false,
            event_name: '',
            event_location: '',
            event_number_places_total: '',
            event_objective: '',
            event_expectation: '',
            event_description: '',
            event_image_event: '',
            event_image_location: '',
            event_image_map: '',
            event_date_start: '',
            event_date_end: '',
            fileEventSave: '',
            fileLocationSave: '',
            fileMapSave: '',
        }
    },
    mounted() {

        if (localStorage.getItem('token')) {
            AuthService()
            this.getDataEvents()

        } else {
            this.$router.push('/')
        }
    },
    methods: {
        eventUpdate: function () {
            this.$emit('eventUpdate', this.eventUpdate)
        },
        async getDataEvents() {
            this.isLoading = true

            await UserService.getEventContent().then((response) => {

                this.studentData = response.data.data
                let data = response.data.data.map(function (item) {
                    item.created_at = Moment(item.event_created_at).format('YYYY-MM-DD HH:mm')
                    return item
                })
                return data


            }).catch(error => {
                console.log('This Error getDataEventsTable', error);
            })
            this.isLoading = false
        },

        onFileSaveEvent(e) {

            let image_event = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_event)
            reader.onload = e => {
                this.fileEventSave = e.target.result
            }
        },
        onFileSaveLocation(e) {

            let image_location = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_location)
            reader.onload = e => {
                this.fileLocationSave = e.target.result
            }
        },

        onFileSaveMap(e) {

            let image_map = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(image_map)
            reader.onload = e => {
                this.fileMapSave = e.target.result
            }
        },
        getEventInfoSave() {

            this.modalActive = true
            this.eventInfoSave = true
            //this.eventInfoUpdate = this.id
        },
        getEventInfoCheck() {
            this.modalActive = true
            this.eventInfoCheck = true
            //this.eventInfoUpdate = this.id
        },
        async btnSetNew() {
            this.toggleModalNew()
        },

        async saveNewEvent() {

            this.isLoadingTable = true
            this.modalNew = true
            this.isNew = true
            this.isButton = false
            const eventDataNew = {
                event_name: this.event_name,
                event_location: this.event_location,
                event_objective: this.event_objective,
                event_expectation: this.event_expectation,
                event_description: this.event_description,
                event_image_event: this.fileEventSave,
                event_image_location: this.fileLocationSave,
                event_image_map: this.fileMapSave,
                event_date_start: Moment(this.event_date_start).format('YYYY-MM-DD HH:mm'),
                event_date_end: Moment(this.event_date_end).format('YYYY-MM-DD HH:mm'),
                user_id: this.$store.state.id,
                event_number_places_total:  this.event_number_places_total,
                event_number_places: 15,
                event_location_id: '000'
            }

            await UserService.saveEvent(eventDataNew).then((response) => {

                this.isLoadingTable = false
                this.modalNew = false
                location.reload()

            }).catch(error => {
                console.log('This Error saveEvent', error);
            })
        },
        toggleModalNew() {
            if (this.allowClose) {
                this.modalNew = !this.modalNew
                if (!this.modalNew) {
                    this.modalID = null
                    clearTimeout(this.cancelTimeOut)
                }
            }
        },
        toggleModalActiveSave() {
            if (this.allowClose) {
                this.modalActive = !this.modalActive
                if (!this.modalActive) {
                    this.modalID = null
                    clearTimeout(this.cancelTimeOut)
                }
            }
        },
    },
}
</script>

<style></style>