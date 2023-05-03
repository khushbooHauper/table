import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { prevStep, nextStep, setFormData, userList, editFormData, setCurrentStep } from './redux/formSlice';
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";







export const Step1 = ({ formData, next }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const personalInfoValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required')
  });

  return (
    <Formik
      initialValues={{
        name: formData.name || '',
        email: formData.email || '',
        password: formData.password || '',
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || ''
      }}
      validationSchema={personalInfoValidationSchema}
      onSubmit={(values) => {
        setIsSubmitting(true);
        dispatch(setFormData(values));
        next();
        console.log(values)
      }}
    >
      {({ errors, touched, isValid, values, handleChange }) => (
        <Form>
          <Field
            name="name"
            label="name"
            as={TextField}
            fullWidth
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <div className="error">{errors.name}</div>
          )}
          <Field
            name="email"
            label="email"
            as={TextField}
            fullWidth
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <div className="error">{errors.email}</div>
          )}
          <Field
            name="password"
            label="password"
            value={values.password}
            as={TextField}
            fullWidth

            onChange={handleChange}
          />
          {errors.password && touched.password && <div className="error">{errors.password}</div>}
          <Field
            name="address"
            label="address"
            as={TextField}
            fullWidth
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && touched.address && <div className="error">{errors.address}</div>}
          <Field
            name="city"
            label="city"
            as={TextField}
            fullWidth
            value={values.city}
            onChange={handleChange}
          />
          {errors.city && touched.city && <div className="error">{errors.city}</div>}
          <Field
            name="state"
            label="state"
            as={TextField}
            fullWidth
            value={values.state}
            onChange={handleChange}
          />
          {errors.state && touched.state && <div className="error">{errors.state}</div>}

          <Button type="submit" disabled={isSubmitting || !isValid}>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};


export const Step2 = ({ formData, next, prev }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankingValidationSchema = Yup.object().shape({
    bank: Yup.string().required('Bank name is required'),
    accountNumber: Yup.number()
      .typeError('Account number must be a number')
      .required('Account number is required'),
    ifsc: Yup.string().required('IFSC code is required'),
  });

  return (
    <Formik
      initialValues={{
        bank: formData.bank || '',
        accountNumber: formData.accountNumber || '',
        ifsc: formData.ifsc || '',
      }}
      validationSchema={bankingValidationSchema}
      onSubmit={(values) => {
        setIsSubmitting(true);
        dispatch(setFormData(values));
        next();
        console.log(values)
      }}
    >
      {({ errors, touched, isValid, values, handleChange }) => (
        <Form>
          <Field
            name="bank"
            label="Bank"
            as={TextField}
            fullWidth
            value={values.bank || ''}
            onChange={handleChange}
          />
          {errors.bank && touched.bank && <div className="error">{errors.bank}</div>}
          <Field
            name="accountNumber"
            label="Account number"
            as={TextField}
            fullWidth
            value={values.accountNumber || ''}
            onChange={handleChange}
          />
          {errors.accountNumber && touched.accountNumber && (
            <div className="error">{errors.accountNumber}</div>
          )}
          <Field
            name="ifsc"
            label="IFSC code"
            as={TextField}
            fullWidth
            value={values.ifsc || ''}
            onChange={handleChange}
          />
          {errors.ifsc && touched.ifsc && <div className="error">{errors.ifsc}</div>}
          <Button onClick={prev}>Back</Button>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const EducationForm = ({ values, handleChange, handleAdd, handleRemove }) => {

  // const { setFieldValue } = useFormikContext();
  // const handleChange = (event, index) => {
  //   const { name, value } = event.target;
  //   setFieldValue(`education.${index}.${name}`, value);
  // };

  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <FieldArray name="education">
          {({ remove, push }) => (
            <>
              {values && values.education && values.education.map((edu, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={3}>
                    <Field name={`education.${index}.courseName`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="courseName"
                            fullWidth
                            name={`education.${index}.courseName`}
                            value={edu.courseName || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`education.${index}.courseName`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <Field name={`education.${index}.university`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="university"
                            fullWidth
                            name={`education.${index}.university`}
                            value={edu.university || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`education.${index}.university`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <Field name={`education.${index}.percentage`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="percentage"
                            fullWidth
                            name={`education.${index}.percentage`}
                            value={edu.percentage || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`education.${index}.percentage`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={2}>
                    <Field name={`education.${index}.passingYear`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="passingYear"
                            fullWidth
                            name={`education.${index}.passingYear`}
                            value={edu.percentage || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`education.${index}.passingYear`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  {values.education.length > 1 && (
                    <Grid item xs={1}>
                      <IconButton onClick={() => handleRemove(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAdd({ courseName: "", university: "", percentage: "", passingYear: "" })}
                >
                  Add Education
                </Button>
              </Grid>
            </>
          )}
        </FieldArray>
      </Grid>
    </Box>
  );
};

export const Step3 = ({ formData, next, prev }) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    education: formData.education || [{ courseName: "", university: "", percentage: "", passingYear: "" }],
  });

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    setFormValues(prevState => ({
      ...prevState,
      education: prevState.education.map((edu, i) => {
        if (i === index) {
          return { ...edu, [name]: value };
        }
        return edu;
      })
    }));
  };
  const handleAdd = () => {
    setFormValues(prevState => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          courseName: "",
          university: "",
          percentage: "",
          passingYear: ""
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setFormValues(prevState => ({
      ...prevState,
      education: prevState.education.filter((edu, i) => i !== index)
    }));
  };
  const educationValidationSchema = Yup.object().shape({
    education: Yup.array().of(
      Yup.object().shape({
        courseName: Yup.string().required('Course name is required'),
        university: Yup.string().required('University is required'),
        percentage: Yup.number()
          .typeError('Percentage must be a number')
          .min(0, 'Percentage must be greater than or equal to 0')
          .max(100, 'Percentage must be less than or equal to 100')
          .required('Percentage is required'),
        passingYear: Yup.number()
          .typeError('Passing year must be a number')
          .integer('Passing year must be an integer')
          .min(1900, 'Passing year must be after 1900')
          .max(new Date().getFullYear(), 'Passing year cannot be in the future')
          .required('Passing year is required'),
      })
    ),
  });

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={educationValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setIsSubmitting(true);
          dispatch(setFormData(values));
          next();
          console.log(values)

        }}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting, handleChange, isValid }) => (
          <Form>
            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <EducationForm
                  values={formValues}
                  handleChange={handleChange}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              )}
            />
            <Button onClick={prev}>Back</Button>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};



const ExperienceForm = ({ values, handleChange, handleAdd, handleRemove }) => {
  return (

    <Box display="flex" flexDirection="column" mt={2}>
      <Grid container spacing={3}>
        <FieldArray name="experience">
          {({ remove, push }) => (
            <>
              {values && values.experience && values.experience.length > 0 && values.experience.map((exp, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={2}>
                    <Field name={`experience.${index}.company`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="company"
                            fullWidth
                            name={`experience.${index}.company`}
                            value={exp.company || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`experience.${index}.company`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={2}>
                    <Field name={`experience.${index}.designation`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="designation"
                            fullWidth
                            name={`experience.${index}.designation`}
                            value={exp.designation || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`experience.${index}.designation`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>

                    <Field name={`experience.${index}.joiningDate`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="joiningDate"
                            fullWidth
                            id="date"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            name={`experience.${index}.joiningDate`}
                            value={exp.joiningDate || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`experience.${index}.joiningDate`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>

                  </Grid>
                  <Grid item xs={3}>


                    <Field name={`experience.${index}.leavingDate`}>
                      {({ field }) => (
                        <>
                          <TextField
                            label="experience"
                            fullWidth
                            id="date"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            name={`education.${index}.leavingDate`}
                            value={exp.leavingDate || ""}
                            onChange={(event) => handleChange(event, index)}
                            {...field}
                          />
                          <ErrorMessage
                            name={`experience.${index}.leavingDate`}
                            component="div"
                            className="error"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  {values.experience.length > 1 && (
                    <Grid item xs={1}>
                      <IconButton onClick={() => handleRemove(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    handleAdd({
                      company: "",
                      designation: "",
                      joiningDate: '',
                      leavingDate: ''
                    })
                  }
                >
                  Add Experience
                </Button>
              </Grid>
            </>
          )}
        </FieldArray>
      </Grid>
    </Box>

  );
};

export const Step4 = ({ formData, prev, next }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formexpValues, setformExpValues] = useState({
    experience: formData.experience || [{ company: "", designation: "", joiningDate: "", leavingDate: "" }]
  });


  const experienceValidationSchema = Yup.object().shape({
    experience: Yup.array().of(
      Yup.object().shape({
        company: Yup.string().required('Company is required'),
        designation: Yup.string().required('Designation is required'),
        joiningDate: Yup.date().required('Joining date is required'),
        leavingDate: Yup.date().required('Leaving date is required')
      })
    )
  });
  const handleChange = (event, index) => {
    const { name, value } = event.target;

    setformExpValues(prevState => ({
      ...prevState,
      experience: prevState.experience.map((exp, i) => {
        if (i === index) {
          return { ...exp, [name]: value };
        }
        return exp;
      })
    }));
    console.log(formexpValues)
  };
  const handleAdd = () => {
    setformExpValues(prevState => ({
      ...prevState,
      experience: [
        ...prevState.experience,
        {
          company: "", designation: "", joiningDate: "", leavingDate: ""
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setformExpValues(prevState => ({
      ...prevState,
      experience: prevState.experience.filter((edu, i) => i !== index)
    }));
  };
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    bank: '',
    accountNumber: '',
    ifsc: '',
    education: [{ courseName: "", university: "", percentage: "", passingYear: "" }],
    experience: [{ company: "", designation: "", joiningDate: "", leavingDate: "" }],
  };
  return (
    <div>
      {success ? (
        <div>
          <h2>Form submitted successfully!</h2>
          <Button onClick={prev}>Back</Button>
        </div>
      ) : (
        <Formik
          initialValues={{
            ...initialFormValues,
            ...formData
          }}
          validationSchema={experienceValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            experienceValidationSchema.validate(values)
              .then(valid => {
                console.log(values)
                dispatch(setFormData(values));
                dispatch(userList(values));
                setSuccess(true);
                next();
                dispatch(
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    city: '',
                    state: '',
                    bank: '',
                    accountNumber: '',
                    ifsc: '',
                    experience: [],
                    education: []
                  })
                );
                setSubmitting(false);
              })
              .catch(errors => {
                // set errors to display on the form
                setErrors(errors);
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <FieldArray name="experience">
                {(arrayHelpers) => (
                  <>
                    <ExperienceForm values={formexpValues}
                      handleChange={handleChange}
                      handleAdd={handleAdd}
                      handleRemove={handleRemove} />
                  </>
                )}
              </FieldArray>
              <Button onClick={prev}>Back</Button>
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
