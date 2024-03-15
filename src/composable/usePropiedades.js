import { computed, ref } from "vue";
//Esto seria con fire base pero es mas facil con vuefire
//import { collection, query, where, getDoc } from "firebase/firestore";

// Con vuefire
import { collection, doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";


export default function usePropiedades() {
    const alberca = ref(false)

    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage) {
        if (confirm('??Desea eliminar esta propiedad')) {
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }

    const filterdItems = computed(() => {
        return alberca.value ?
            propiedadesCollection.value.filter( Propiedad => Propiedad.alberca) :
            propiedadesCollection.value
    })

    return {
        alberca,
        propiedadesCollection,
        filterdItems,
        deleteItem
    }
}