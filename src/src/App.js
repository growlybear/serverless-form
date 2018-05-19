import React from 'react';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const App = ({
  values,
  errors,
  touched,
  isSubmitting
}) => (
  <Form>
    { touched.email && errors.email && <p>{ errors.email }</p> }
    <Field name="email" type="email" placeholder="Email" />
    <br />
    { touched.password && errors.password && <p>{ errors.password }</p> }
    <Field name="password" type="password" placeholder="Password" />
    <br />
    <label>
      <Field name="newsletter" type="checkbox" checked={ values.newsletter } />
      Join our newsletter
    </label>
    <br />
    <Field name="plan" component="select">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <br />
    <button type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      plan: plan || 'premium'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().min(8, 'Must be minimum 8 characters').required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'a@b.c') {
        setErrors({ email: 'Email already taken' })
      }
      else {
        console.log(values)
        resetForm()
      }
    }, 2000)
  }
})(App)

export default FormikApp;
