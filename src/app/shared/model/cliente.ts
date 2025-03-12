import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  selecionado?:boolean
}

export function getClientFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    id: [null],
    name: [null, [Validators.required]],
    salary: [null, [Validators.required]],
    companyValuation: [null, [Validators.required]],
  });
}

