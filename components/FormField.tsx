import React from 'react'

import { Input } from './ui/input';
import { Controller, FieldValues, Control, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form';

interface FormFieldProps<T extends FieldValues> {
   control: Control<T>,
   name: Path<T>,
   lable: string,
   placeholder?: string,
   type? : 'text'| 'email' | 'password' | 'file',
}

const FormField = ({control, name, lable, placeholder, type = 'text'} : FormFieldProps<T> ) => (
   <Controller
      name={name}
      control={control}
      render={({ field }) => (
         <FormItem>
            <FormLabel className='label'>{name}</FormLabel>
            <FormControl>
               
               <Input 
               className='input'
               type= {type}
               placeholder={placeholder} 
               {...field} />

            </FormControl>
            {/* <FormDescription>
               This is your public display {lable}.
            </FormDescription> */}
         </FormItem>
      )}
   />

);

export default FormField