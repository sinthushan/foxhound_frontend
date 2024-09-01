import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors|null => {
    let password1 = control.get('password1')
    let password2 = control.get('password2')
    if (password1 && password2 && password1.value != password2.value){
        return {
            passwordMisMatch: true
        }
    }
    return null
}