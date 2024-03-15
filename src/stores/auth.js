import { ref, computed, onMounted } from 'vue';

import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
    
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    const errorMsg =ref('')
    const errorCode = {
        //A mi no me da estos errores (Al parecer ya no se puede ver esta 
        //informacion debido a que firebase acualizo para prevenir ataques)
        // 'auth/user-not-found': 'Usuario no encontrado',
        // 'auth/wrong-password': 'El password es incorrecto',
        //Este si sale perfectamente
        'auth/invalid-credential': 'Usuario o Contraseña INCORRECTOS'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user
            }
        })
    })

    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((UserCredential) => {
                const user = UserCredential.user
                authUser.value = user
                router.push({name: 'admin-propiedades'})
            })
            .catch((error) => { 
                errorMsg.value = errorCode[error.code]
                setTimeout(() => {
                    errorMsg.value = ''
                }, 3000);
            })
    }
    
    const logaut = () => {
        signOut(auth).then(() => {
            authUser.value = null
            router.push({name: 'login'})
          }).catch((error) => {
            console.log(error)
          });
    }

    const hasError = computed(() => {
        return errorMsg.value
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    return {
        hasError,
        errorMsg,
        isAuth,
        login,
        logaut,
    }
})