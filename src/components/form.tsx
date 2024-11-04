import React, { useState } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import EmploymentTypeDropdown from './employmentTypes';
import WorkSchedule from './clock';
import dayjs from 'dayjs'
import { SubmissionForm } from '../Types/form';

interface MainFormProps {
    setFieldValue: (field: string, value: string) => void;
    isSubmitting?: boolean;
    values?: SubmissionForm;
    handleChange?: (field: string, value: string) => void;
    handleBlur?: (field: string, value: string) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
}

const MainForm: React.FC<MainFormProps> = ({ setFieldValue, isSubmitting, touched, errors }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [issueDate, setIssueDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        setFieldValue('startDate', dayjs(date)?.format('DD/MM/YYYY'));
    };
    const handleIssueDateChange = (date: Date | null) => {
        setIssueDate(date);
        setFieldValue('dateOfIssue', dayjs(date)?.format('DD/MM/YYYY'));
    };
    const handleOptionSelect = (selectOption: string) => {
        setFieldValue('employmentType', selectOption);
    };

    const handleWorkScheduleStart = (time: string) => {
        setFieldValue('workScheduleStart', time);
    };

    const handleWorkScheduleEnd = (time: string) => {
        setFieldValue('workScheduleEnd', time);
    };
    console.log(touched?.candidateName && errors?.candidateName !== '')
    return (
        <Form>
            <div>
                <label>
                    <span>Date of issue <span style={{ color: 'red' }}>*</span></span>
                    <DatePicker
                        selected={issueDate}
                        placeholderText='dd/mm/yyyy'
                        dateFormat='dd/MM/yyyy'
                        onChange={handleIssueDateChange}
                        customInput={
                            <input
                                type="text"
                                className={`field ${touched.dateOfIssue && errors.dateOfIssue ? 'error-border' : ''}`}
                                placeholder="Select a date"
                            />
                        }
                    />
                    <ErrorMessage name="candidateName" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <span>Candidate Name <span style={{ color: 'red' }}>*</span></span>
                    <Field
                        name="candidateName"
                        type="text"
                        className={`field ${touched.candidateName && errors.candidateName ? 'error-border' : ''}`}
                        placeholder="Enter candidate's name"
                    />
                    <ErrorMessage name="candidateName" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <span>Job Title <span style={{ color: 'red' }}>*</span></span>
                    <Field
                        name="jobTitle"
                        type="text"
                        className={`field ${touched.jobTitle && errors.jobTitle ? 'error-border' : ''}`} placeholder="Enter job title"
                    />
                    <ErrorMessage name="jobTitle" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <span>Reporting To <span style={{ color: 'red' }}>*</span></span>
                    <Field
                        name="reportingTo"
                        type="text"
                        className={`field ${touched.reportingTo && errors.reportingTo ? 'error-border' : ''}`}
                        placeholder="Enter reporting manager"
                    />
                    <ErrorMessage name="reportingTo" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <span>Start Date <span style={{ color: 'red' }}>*</span></span>
                    <DatePicker
                        selected={startDate}
                        placeholderText='dd/mm/yyyy'
                        dateFormat='dd/MM/yyyy'
                        onChange={handleDateChange}
                        customInput={
                            <input
                                type="text"
                                className={`field ${touched.startDate && errors.startDate ? 'error-border' : ''}`}
                                placeholder="Select a date"
                            />
                        }
                    />
                    <ErrorMessage name="startDate" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <EmploymentTypeDropdown onOptionSelect={handleOptionSelect} touched={touched} errors={errors} />
                    <ErrorMessage name="employmentType" component="div" className="error-message" />
                </label>
            </div>
            <div>
                <label>
                    <span>Annual CTA <span style={{ color: 'red' }}>*</span></span>
                    <Field
                        name="annualCTA"
                        type="text"
                        className={`field ${touched.annualCTA && errors.annualCTA ? 'error-border' : ''}`}
                        placeholder="Enter annual compensation"
                    />
                    <ErrorMessage name="annualCTA" component="div" className="error-message" />
                </label>
            </div>
            <div className="work-schedule">
                <WorkSchedule onStart={handleWorkScheduleStart} onEnd={handleWorkScheduleEnd} errors={errors} touched={touched} />
            </div>
            <div>
                <label>
                    <span>Job Location <span style={{ color: 'red' }}>*</span></span>
                    <Field
                        name="jobLocation"
                        type="text"
                        className={`field ${touched.jobLocation && errors.jobLocation ? 'error-border' : ''}`}
                        placeholder="Enter job location"
                    />
                    <ErrorMessage name="jobLocation" component="div" className="error-message" />
                </label>
            </div>
            <div className="parent-element">
                <button type="submit" disabled={isSubmitting}>Generate Offer Letter</button>
            </div>
        </Form>
    );
};

export default MainForm;
