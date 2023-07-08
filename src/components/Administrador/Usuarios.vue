<template ><!--div class="content-fluid">
        <div class="row">
            <div class="container-fluid"-->
<!-- DataTales Example -->
<!--div class="card shadow mb-4">
                    <div class="card-header py-3 text-start ">
                        Usuarios
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                <div class="row">
                                    <div class="input-group">
                                        <span class="input-group-text">Buscar</span>
                                        <input type="text" aria-label="First name" v-model="StringBuscar"
                                            @change="btnfiltrar()" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <table id="tableComponent"
                                                class="table table-bordered table-striped align-items-center">
                                                <thead>
                                                    <tr role="row">
                                                        <th class="sorting sorting_asc" tabindex="0"
                                                            aria-controls="dataTable" rowspan="1" colspan="1"
                                                            aria-sort="ascending"
                                                            aria-label="Name: activate to sort column descending"
                                                            style="width: 195px;">
                                                            Id
                                                        </th>
                                                        <th class="sorting" tabindex="0" aria-controls="dataTable"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Position: activate to sort column ascending"
                                                            style="width: 296px;">
                                                            Nombre
                                                        </th>
                                                        <th class="sorting" tabindex="0" aria-controls="dataTable"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Office: activate to sort column ascending"
                                                            style="width: 141px;">
                                                            Email
                                                        </th>
                                                        <th class="sorting" tabindex="0" aria-controls="dataTable"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Age: activate to sort column ascending"
                                                            style="width: 66px;text-align: center;">
                                                            Admin
                                                        </th>
                                                        <th class="sorting" tabindex="0" aria-controls="dataTable"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Start date: activate to sort column ascending"
                                                            style="width: 133px; text-align: center;">
                                                            Editar
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="item, index in datos" :key="item.id">
                                                    <tr class="odd">
                                                        <td class="sorting_1">{{ item.id }}</td>
                                                        <td>{{ item.name }}</td>
                                                        <td>{{ item.email }}</td>
                                                        <td>
                                                            <div v-if="item.is_admin == 1">
                                                                <div class="form-check form-switch text-align-center">
                                                                    <input class="form-check-input text-align-center"
                                                                        type="checkbox" id="flexSwitchCheckDefault" checked
                                                                        @click="btnDisabled(item)">
                                                                </div>
                                                            </div>
                                                            <div v-if="item.is_admin == 0" class="text-align-center">
                                                                <div class="form-check form-switch text-align-center">
                                                                    <input class="form-check-input text-align-center"
                                                                        type="checkbox" id="flexSwitchCheckDefault"
                                                                        @click="btnDisabled(item)">
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="text-center">
                                                            <a class="icon-margin">
                                                                                <i class="fa-solid fa-pen-to-square blue link"></i>
                                                            </a-->
<!--a class="icon-margin">
                                                                                <i class="fa-solid fa-trash"></i>
                                                            </a-->
<!--/td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables_info text-start" id="dataTable_info" role="status"
                                            aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                    </div>
                                    <div class="col-sm-12 col-md-7">
                                        <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                            <ul class="pagination">
                                                <li class="paginate_button page-item previous disabled"
                                                    id="dataTable_previous"><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
                                                <li class="paginate_button page-item active"><a href="#"
                                                        aria-controls="dataTable" data-dt-idx="1" tabindex="0"
                                                        class="page-link">1</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="2" tabindex="0" class="page-link">2</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="3" tabindex="0" class="page-link">3</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="5" tabindex="0" class="page-link">5</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="dataTable"
                                                        data-dt-idx="6" tabindex="0" class="page-link">6</a></li>
                                                <li class="paginate_button page-item next" id="dataTable_next"><a href="#"
                                                        aria-controls="dataTable" data-dt-idx="7" tabindex="0"
                                                        class="page-link">Next</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        </div>
                    </div-->

                <div class="container text-center  mt-5 mb-5">
                    <h1 class="mt-5 fw-bolder text-success "> Usuarios </h1>
                    <div class="table-responsive my-5">
                        <table id="tableComponent" class="table table-bordered table-striped align-items-center">
                            <thead>
                                <tr>
                                    <th>
                                        <i class="fa-solid fa-sort">Id</i>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-sort">Nombre</i>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-sort">Email</i>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-sort">Admin</i>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-sort">Editar</i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, index in datos" :key="item.id">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>
                                        <div v-if="item.is_admin == 1">
                                            <div class="form-check form-switch text-align-center">
                                                <input class="form-check-input text-align-center" type="checkbox"
                                                    id="flexSwitchCheckDefault" checked @click="btnDisabledAdmin(item)">
                                            </div>
                                        </div>
                                        <div v-if="item.is_admin == 0" class="text-align-center">
                                            <div class="form-check form-switch text-align-center">
                                                <input class="form-check-input text-align-center" type="checkbox"
                                                    id="flexSwitchCheckDefault" @click="btnDisabledAdmin(item)">
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <a class="icon-margin">
                                            <i class="fa-solid fa-pen-to-square blue link"></i>
                        </a>
                            <!--a class="icon-margin">
                                <i class="fa-solid fa-trash"></i>
                            </a-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
</template>
<script>

import UserService from '../../services/user.service'
import AuthService from "../../services/auth-user"

export default {
    name: 'usuariosView',
    data() {
        return {
            datos: null,
            midata: null,
            StringBuscar: null
        }
    },
    methods: {
        btnfiltrar() {
            console.log(this.StringBuscar)
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            AuthService()
            this.getUserData()

        } else {
            this.$router.push('/')
        } 
    },
    methods: {
        async getUserData() {

            await UserService.getUserContent().then((response) => {

                this.datos = response.data.data

            }).catch(error => {
                console.log('This Error getUserData', error);
            })
        },
        async btnDisabledAdmin(item) {

            //this.isLoadingCheck = true
            //this.isButton = false

            await UserService.updateUser(item).then((response) => {

                //this.isLoadingCheck = false
                location.reload()

            }).catch(error => {
                console.log('This Error updateEvent', error)
            })

        },
    }
}
</script>

<style scoped>
table th:hover {
    background: #f2f2f2;
}
</style>

