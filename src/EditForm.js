import { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import { editFormData, userList } from './redux/formSlice';
import { useDispatch } from 'react-redux';

const EditForm = ({ formData, onSave, onCancel, index }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        bank: Yup.string().required('Bank is required'),
        accountNumber: Yup.number()
            .typeError('Account number must be a number')
            .required('Account number is required'),
        ifsc: Yup.string().required('IFSC is required'),
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
        experience: Yup.array().of(
            Yup.object().shape({
                company: Yup.string().required('Company is required'),
                designation: Yup.string().required('Designation is required'),
                joiningDate: Yup.date().typeError('joiningDate must be a date').required('Joining date is required'),
                leavingDate: Yup.date().required('Leaving date is required')
            })
        )
    });

    return (
        <>
            <div style={{ backgroundColor: 'white', padding: '2rem', maxHeight: '500px', overflowY: 'auto', width: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Formik
                    initialValues={{
                        name: formData.name || '',
                        email: formData.email || '',
                        address: formData.address || '',
                        city: formData.city || '',
                        state: formData.state || '',
                        bank: formData.bank || '',
                        accountNumber: formData.accountNumber || '',
                        ifsc: formData.ifsc || '',
                        education: formData.education || [],
                        experience: formData.experience || [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true); // set isSubmitting to true before dispatching action
                        onSave({ ...formData, ...values });
                    }}
                >
                    {({ values, handleChange, isSubmitting, errors, touched, isValid, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="name"
                                label="name"
                                as={TextField}
                                fullWidth
                                value={values.name || ''}
                                onChange={handleChange}
                            />
                            {errors.name && touched.name && <div className="error">{errors.name}</div>}
                            <Field
                                name="email"
                                label="email"
                                as={TextField}
                                fullWidth
                                value={values.email || ''}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email && (
                                <div className="error">{errors.email}</div>
                            )}
                            <Field
                                name="address"
                                label="address"
                                as={TextField}
                                fullWidth
                                value={values.address || ''}
                                onChange={handleChange}
                            />
                            {errors.address && touched.address && <div className="error">{errors.address}</div>}
                            <Field
                                name="city"
                                label="city"
                                as={TextField}
                                fullWidth
                                value={values.city || ''}
                                onChange={handleChange}
                            />
                            {errors.city && touched.city && <div className="error">{errors.city}</div>}
                            <Field
                                name="state"
                                label="state"
                                as={TextField}
                                fullWidth
                                value={values.state || ''}
                                onChange={handleChange}
                            />
                            {errors.city && touched.state && <div className="error">{errors.state}</div>}
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
                            <FieldArray name="education">
                                {({ insert, remove, push }) => (
                                    <div className='education-edit'>
                                        {values.education.length > 0 &&
                                            values.education.map((education, index) => (
                                                <div key={index} className='d-flex'>
                                                    <div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`education.${index}.courseName`}>Course Name</label>
                                                            <Field name={`education.${index}.courseName`} type="text" />
                                                            {errors.education && errors.education[index] && errors.education[index].courseName && touched.education && touched.education[index] && touched.education[index].courseName && (
                                                                <div className="error">{errors.education[index].courseName}</div>
                                                            )}
                                                        </div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`education.${index}.university`}>University</label>
                                                            <Field name={`education.${index}.university`} type="text" />
                                                            {errors.education && errors.education[index] && errors.education[index].university && touched.education && touched.education[index] && touched.education[index].university && (
                                                                <div className="error">{errors.education[index].university}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`education.${index}.percentage`}>Percentage</label>
                                                            <Field name={`education.${index}.percentage`} type="text" />
                                                            {errors.education && errors.education[index] && errors.education[index].percentage && touched.education && touched.education[index] && touched.education[index].percentage && (
                                                                <div className="error">{errors.education[index].percentage}</div>
                                                            )}
                                                        </div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`education.${index}.passingYear`}>Passing Year</label>
                                                            <Field name={`education.${index}.passingYear`} type="text" />
                                                            {errors.education && errors.education[index] && errors.education[index].passingYear && touched.education && touched.education[index] && touched.education[index].passingYear && (
                                                                <div className="error">{errors.education[index].passingYear}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Button type="button" onClick={() => remove(index)} >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        <div>
                                            <Button type="button" onClick={() => push({ courseName: '', university: '', percentage: '', passingYear: '' })} color='primary'>
                                                Add Education
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <FieldArray name="experience">
                                {({ insert, remove, push }) => (
                                    <div className='education-edit'>
                                        {values.experience.length > 0 &&
                                            values.experience.map((experience, index) => (
                                                <div key={index} className='d-flex'>
                                                    <div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`experience.${index}.company`}>company</label>
                                                            <Field name={`experience.${index}.company`} type="text" />
                                                            {errors.experience && errors.experience[index] && errors.experience[index].company && touched.experience && touched.experience[index] && touched.experience[index].company && (
                                                                <div className="error">{errors.experience[index].company}</div>
                                                            )}
                                                        </div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`experience.${index}.designation`}>designation</label>
                                                            <Field name={`experience.${index}.designation`} type="text" />
                                                            {errors.experience && errors.experience[index] && errors.experience[index].designation && touched.experience && touched.experience[index] && touched.experience[index].designation && (
                                                                <div className="error">{errors.experience[index].designation}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='education-fields'>
                                                            <label htmlFor={`experience.${index}.joiningDate`}>joiningDate</label>
                                                            <Field name={`experience.${index}.joiningDate`} type="date" />
                                                            {errors.experience && errors.experience[index] && errors.experience[index].joiningDate && touched.experience && touched.experience[index] && touched.experience[index].joiningDate && (
                                                                <div className="error">{errors.experience[index].joiningDate}</div>
                                                            )}
                                                        </div>


                                                        <div className='education-fields'>
                                                            <label htmlFor={`experience.${index}.leavingDate`}>leavingDate</label>
                                                            <Field name={`experience.${index}.leavingDate`} type="date" />
                                                            {errors.experience && errors.experience[index] && errors.experience[index].leavingDate && touched.experience && touched.experience[index] && touched.experience[index].leavingDate && (
                                                                <div className="error">{errors.experience[index].leavingDate}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Button type="button" onClick={() => remove(index)}  >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        <div>
                                            <Button type="button" onClick={() => push({ company: '', designation: '', joiningDate: '', leavingDate: '' })} color='primary'>
                                                Add Experience
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <div>
                                <Button type="submit" disabled={isSubmitting || !isValid}>Save</Button>
                                <Button onClick={onCancel}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>
        </>
    );
};

export default EditForm;
