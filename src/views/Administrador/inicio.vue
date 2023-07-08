<template>
    <div class="container text-center">
        <br>
        <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Talleres Activos</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800"> {{ count_rooms }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-graduation-cap fa-2x text-gray-300"></i>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Eventos</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800"> {{ count_events }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-bookmark fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase bold mb-1">
                                    Usuarios
                                </div>

                                <div class="h5 mb-0 font-weight-bold text-gray-800"> {{ total_usuarios }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas  fa-users fa-2x text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Usuarios Logeados
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    {{ total_usuarios_logeados }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Histograma</h6>
                    </div>
                    <div class="card-body">

                        <div style="display: flex;flex-direction:column;">
                            <vue3-chart-js :id="PieChart.id" ref="chartRef" :type="PieChart.type"
                                :data="PieChart.data"></vue3-chart-js>
                            <!--  <button @click="updateChart">Update Chart</button> -->
                        </div>
                        <br>
                        <br>

                        <div style="display: flex;flex-direction:column;">
                            <vue3-chart-js :id="StackedBarChart.id" ref="chartRef" :type="StackedBarChart.type"
                                :data="StackedBarChart.data"></vue3-chart-js>
                            <!--  <button @click="updateChart">Update Chart</button> -->
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Usuarios/Eventos</h6>
                    </div>
                    <div class="card-body">

                        <div style="display: flex;flex-direction:column;">
                            <vue3-chart-js :id="doughnutChart.id" ref="chartRef" :type="doughnutChart.type"
                                :data="doughnutChart.data"></vue3-chart-js>
                            <!--  <button @click="updateChart">Update Chart</button> -->
                        </div>
                        <br>
                        <br>
                        <h6 class="m-0 font-weight-bold text-primary">Actividad Nivel 5</h6>
                        <br>
                        <br>
                        <div style="display: flex;flex-direction:column;">
                            <vue3-chart-js :id="doughnutChart.id" ref="chartRef" :type="doughnutChart.type"
                                :data="doughnutChart.data"></vue3-chart-js>

                            <!--  <button @click="updateChart">Update Chart</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 


<script>

import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import UserService from '../../services/user.service'

export default {
    components: {
        Vue3ChartJs
    },
    setup() {

        const chartRef = ref(null)

        const doughnutChart = {
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels: ['evento1', 'evento2', 'evento3', 'evento4'],
                datasets: [
                    {
                        backgroundColor: [
                            '#41B883',
                            '#E46651',
                            '#00D8FF',
                            '#DD1B16'
                        ],
                        data: [40, 20, 80, 10]
                    }
                ]
            }
        }

        const updateChart = () => {
            doughnutChart.data.labels = ['evento5', 'evento6', 'evento7', 'evento8']
            doughnutChart.data.datasets = [
                {
                    backgroundColor: [
                        '#333333',
                        '#E46651',
                        '#00D8FF',
                        '#DD1B16'
                    ],
                    data: [100, 20, 800, 20]
                }
            ]

            chartRef.value.update()
        }

        const PieChart = {
            id: 'bar',
            type: 'bar',
            data: {
                labels: ['evento1', 'evento2', 'evento3', 'evento4', 'evento5'],
                datasets: [{
                    backgroundColor: [
                        '#4e73df',
                        '#E46651',
                        '#00D8FF',
                        '#DD1B16',
                        '#00D8FF'
                    ],
                    data: [40, 20, 80, 20, 7]
                }]
            },
        }

        const StackedBarChart = {
            type: 'bar',
            data: {
                labels: ["Activos"],
                datasets: [{
                    label: 'Registros',
                    backgroundColor: "#caf270",
                    data: [2],
                }, {
                    label: 'Entradas',
                    backgroundColor: "#45c490",
                    data: [98],
                }]
            },
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        mode: 'x',
                    },
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                        type: 'linear',
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'bottom' },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: { position: 'bottom' },
        };

        return {
            doughnutChart,
            updateChart,
            chartRef,
            PieChart,
            StackedBarChart
        }

    },
    data() {
        return {
            
            count_rooms: '',
            count_events: '',
            total_usuarios: '',
            total_usuarios_logeados: '',
            
            datosGraficaUno: [],
            datosGraficaDos: [],
            datosGraficaTres: [],
            rooms: '',
            events_one: '',
            events_two: '',
            events_three: '',
            events_four: '',
            event_number: ''
            
        }
    },
    mounted() {
      this.getDatosGraficaUno()
    },
    methods: {
        async getDatosGraficaUno() {
            
            await UserService.getEventContent().then((response) => {
                this.events_one = response.data.data
                this.count_events = this.events_one.length
               
            }).catch(error => {
                console.log('This Error getEventContent', error);
            })

            await UserService.getRoom().then((response) => {
                this.rooms = response.data.data
                this.count_rooms = this.rooms.length
               
            }).catch(error => {
                console.log('This Error getEventContent', error);
            })
        },
        async getDatosGraficaDos() {
            
            await UserService.getEventContent().then((response) => {
                this.events_two = response.data.data
            }).catch(error => {
                console.log('This Error getEventContent', error);
            })
        },
        async getDatosGraficaTres() {
           
            await UserService.getEventContent().then((response) => {
                this.events_three = response.data.data
            }).catch(error => {
                console.log('This Error getEventContent', error);
            })
        },
        async getDatosGraficaCuatro() {
            
            await UserService.getEventContent().then((response) => {
                this.events_four = response.data.data
            }).catch(error => {
                console.log('This Error getEventContent', error);
            })
        }
    }
}
</script>

<style>
.border-left-primary {
    border-left: .25rem solid #4e73df !important;
}

.border-left-success {
    border-left: .25rem solid #1cc88a !important;
}

.border-left-info {
    border-left: .25rem solid #36b9cc !important;
}

.text-primary {
    color: #4e73df !important;
}

.text-gray-300 {
    color: #dddfeb !important;
}

.text-warning {
    color: #f6c23e !important;
}

.border-left-warning {
    border-left: .25rem solid #f6c23e !important;
}

.align-items-center {
    align-items: center !important;
}

.text-gray-800 {
    color: #5a5c69 !important;
}

.text-gray-800 {
    color: #5a5c69 !important;
}

.font-weight-bold {
    font-weight: 700 !important;
}

.mb-0,
.my-0 {
    margin-bottom: 0 !important;
}

.h5,
h5 {
    font-size: 1.25rem;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-bottom: 0.5rem;
    font-weight: 400;
    line-height: 1.2;
}

*,
::after,
::before {
    box-sizing: border-box;
}

div {
    display: block;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    text-align: left;
}

body {
    margin: 0;
    font-family: Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #858796;
    text-align: left;
    background-color: #fff;
}

:root {
    --blue: #4e73df;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #e74a3b;
    --orange: #fd7e14;
    --yellow: #f6c23e;
    --green: #1cc88a;
    --teal: #20c9a6;
    --cyan: #36b9cc;
    --white: #fff;
    --gray: #858796;
    --gray-dark: #5a5c69;
    --primary: #4e73df;
    --secondary: #858796;
    --success: #1cc88a;
    --info: #36b9cc;
    --warning: #f6c23e;
    --danger: #e74a3b;
    --light: #f8f9fc;
    --dark: #5a5c69;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.wrapper {
    width: 60%;
    display: block;
    overflow: hidden;
    margin: 0 auto;
    padding: 60px 50px;
    background: #fff;
    border-radius: 4px;
}

canvas {
    background: #fff;
    height: 400px;
}

h1 {
    font-family: Roboto;
    color: #fff;
    margin-top: 50px;
    font-weight: 200;
    text-align: center;
    display: block;
    text-decoration: none;
}
</style>

