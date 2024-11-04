import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './styles/form.css';
import { toast, ToastContainer } from 'react-toastify';
import MainForm from './form';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const OfferLetterForm = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: any, { setSubmitting, setTouched }: any,) => {
        try {
            setTouched({
                dateOfIssue: true,
                candidateName: true,
                jobTitle: true,
                startDate: true,
                reportingTo: true,
                employmentType: true,
                annualCTA: true,
                workScheduleStart: true,
                workScheduleEnd: true,
                jobLocation: true,
            }, true);
            setSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('Form submitted successfully!');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('opening preview in new tab...!');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate('/offer-letter', { state: { formData: values } });
        } catch (error: any) {
            toast.error('Form submission failed. Please try again.', {
                position: 'top-center',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <h1 style={{ textAlign: "center" }}> Fill the Offer Letter Form</h1>
            <Formik
                initialValues={{
                    dateOfIssue: '',
                    candidateName: '',
                    jobTitle: '',
                    reportingTo: '',
                    startDate: '',
                    employmentType: '',
                    annualCTA: '',
                    workScheduleStart: '',
                    workScheduleEnd: '',
                    jobLocation: '',
                }}
                validationSchema={Yup.object({
                    dateOfIssue: Yup.string().required('Required'),
                    candidateName: Yup.string().required('Required'),
                    jobTitle: Yup.string().required('Required'),
                    reportingTo: Yup.string().required('Required'),
                    startDate: Yup.string().required('Required'),
                    employmentType: Yup.string().required('Required'),
                    annualCTA: Yup.string().required('Required'),
                    workScheduleStart: Yup.string().required('Required'),
                    workScheduleEnd: Yup.string().required('Required'),
                    jobLocation: Yup.string().required('Required'),
                })}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, values, handleChange, handleBlur, setFieldValue, touched, errors }) =>
                    <div>
                        <MainForm
                            isSubmitting={isSubmitting}
                            values={values}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                        />
                    </div>
                }
            </Formik>
        </>
    );
};

export default OfferLetterForm;