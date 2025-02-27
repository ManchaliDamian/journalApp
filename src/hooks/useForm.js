import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setformValidation] = useState({

    })
    useEffect(() => {
      setFormState( initialForm );
    }, [initialForm])
    
    useEffect(() => {
        createValidators();
    }, [formState]) //cada vez que cambia el formulario, se vuelve a disparar
    
    // useMemo memoriza el valor de la funcion isFormValid
    const isFormValid = useMemo( () => {
        // retornar un bool si es valido o no el formulario

        for( const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }
    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations)) { //esto retorna email, name y password
            const[ fn, errorMessage = 'este campo es requerido.' ] = formValidations[formField]; // esto retorna la funcion y el mensaje del error
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            //crea una propiedad computada donde crea emailValid etc
        }
        setformValidation( formCheckedValues )
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}