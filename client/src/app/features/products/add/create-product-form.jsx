import { Formik } from "formik";
import React from "react";

export const CreateProductForm = ({ onSubmit2 }) => (
    <Formik
        initialValues={{ name: "", brand: "" }}
        render={({ values, errors, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                </div>
                <div>
                    <label>Brand: </label>
                    <input type="text" name="brand" onChange={handleChange} onBlur={handleBlur} value={values.brand} />
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>
                        Create
                    </button>
                </div>
            </form>
        )}
        onSubmit={(values, actions) => {
            console.log(JSON.stringify(values));
            actions.setSubmitting(false);
            onSubmit2(values);
        }}
    />
);
