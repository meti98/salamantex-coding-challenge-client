import React from 'react';
import { Field, FormikProps, FieldProps, FieldAttributes } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps, StandardTextFieldProps } from '@material-ui/core/TextField';

export type DCTextFieldProps = StandardTextFieldProps;

export const DCTextField : React.FC<DCTextFieldProps> = (props: DCTextFieldProps) => {
    
    return (
        <Field
            
            {...props}
            render={(formikProps: FieldProps<any>) => {
                return (
                    <div>
                        <TextField {...formikProps.field} {...props} />
                        { formikProps.form.errors[formikProps.field.name] && formikProps.form.touched[formikProps.field.name] &&
                         formikProps.field.value && (formikProps.field.value as string).length > 0 &&
                            <div style={{color:'red'}}>{formikProps.form.errors[formikProps.field.name]}</div>
                        }
                    </div>
                );
            }}
        />  
    );
}