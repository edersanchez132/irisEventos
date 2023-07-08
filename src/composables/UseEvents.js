import { ref, onMounted } from 'vue'
import { fechEvents } from '../apis/events'

export default function useEvents(){
    const getEvents = ref([])

    const setEvents = async () => {
        getEvents.value = await fechEvents()
    }

    onMounted(setEvents)

    return{
        getEvents,
        setEvents
    }
}
