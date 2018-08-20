import * as Yup from "yup";

import { Formik } from "formik";
import React from "react";

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    brand: Yup.string().required()
});

export const CreateProductForm = ({ onCreate }) => (
    <Formik
        initialValues={{ name: "", brand: "" }}
        render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                    {touched.name && errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label>Brand: </label>
                    <input type="text" name="brand" onChange={handleChange} onBlur={handleBlur} value={values.brand} />
                    {touched.brand && errors.brand && <div>{errors.brand}</div>}
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>
                        Create
                    </button>
                </div>
            </form>
        )}
        validationSchema={ValidationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            onCreate(values);
        }}
    />
);
