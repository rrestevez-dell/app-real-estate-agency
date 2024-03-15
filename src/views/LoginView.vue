<script setup>
    import { useForm, useField } from 'vee-validate';
    import { useAuthStore } from '@/stores/auth';

    import { loginSchema as validationSchema } from '@/validation/loginSchema';

    const { handleSubmit } = useForm({ validationSchema })
    const auth = useAuthStore()

    const email = useField('email') // este nombre ('email') lo damos nosotros y va a ser el nombre del modelo
    const password = useField('password')
    //Nota: para saber las funciones que acepta y mas podemos colocar console.log(nombre)

    const submit = handleSubmit((values) => {
        auth.login(values)
    })


</script>

<template>
    <v-card 
        flat=""
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold my-5 text-center"
            tag="h3"
        >
            Iniciar Sesión
        </v-card-title>
        <v-card-subtitle 
            class="text-h5"
        >
            Inicia sesion con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            class="my-5"
            :title="auth.errorMsg"
            type="error"
        ></v-alert>

        <v-form class="mt-5">
            <v-text-field
                type="email"
                label="Email"
                class="mb-3"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"   
                :error-messages="email.errorMessage.value"             
            />
            <v-text-field
                type="password"
                label="Password"
                class="mb-3"
                bg-color="blue-grey-lighten-5"                
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"     
            />
            <v-btn
                block=""
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar sesion
            </v-btn>

        </v-form>
    </v-card>
</template>
