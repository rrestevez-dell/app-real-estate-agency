import { ref } from "vue";

export default function useLocationMap(initialPinPosition = [39.477320, -0.420583]) {
    
    const zoom = ref(16)
    const center = ref(initialPinPosition)

    function pin (e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    } 


    return {
        zoom,
        center,
        pin
    }
}