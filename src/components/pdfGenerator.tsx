import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { SubmissionForm } from '../Types/form'
import logo from '../assets/Clogo.png';
import { useLocation } from 'react-router-dom';
import signature from '../assets/signature.png'
import { months } from '../common/constant';

const styles = StyleSheet.create({
    iframe: {
        width: "100%",
        height: "100vh",
    },
    page: {
        padding: 70,
    },
    section: {
        flexGrow: 1,
        color: '#566573'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 300,
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 15,
        fontWeight: 800,
        color: "black",
        textAlign: 'center',
        marginBottom: 10,
        textDecoration: 'underline',
    },
    address: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 13,
        fontWeight: 'light',
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    titleText: {
        fontSize: 13,
        color: "black",
        fontWeight: 700,
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'flex-end',
        justifyContent: 'space-around'
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
    },
    candidateName: {
        fontSize: 13
    },
    subText: {
        fontSize: 13,
        fontWeight: 700,
        textDecoration: "underline",
        color: "black"
    },
    para: {
        height: 15,
    },
    table: {
        width: '75%',
        alignSelf: "center",
        fontSize: 12,
        borderCollapse: 'collapse',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add some shadow for depth
        border: '1px solid #ddd',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
    },
    tableCell: {
        flex: 1,
        textAlign: 'left',
        padding: '5px',
        border: '1px solid #ddd'
    },
    tableHeader: {
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
        backgroundColor: 'black',
        color: 'white',
        padding: '5px',
        textAlign: 'center',
    },
    bulletPoints: {
        marginVertical: 5,
        paddingLeft: 10,
    },
    bulletText: {
        fontSize: 13,
        lineHeight: 1.5,
        marginBottom: 4,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    number: {
        fontSize: 13,
        fontWeight: 'bold',
    },
});

const PdfGenerator = () => {
    const location = useLocation();

    if (!location.state || !location.state.formData) {
        return <Text>No data available</Text>;
    }
    console.log("Location", location)
    const data = location?.state?.formData;
    const {
        dateOfIssue,
        candidateName,
        jobTitle,
        reportingTo,
        startDate,
        employmentType,
        annualCTA,
        workScheduleStart,
        workScheduleEnd,
        jobLocation,
    } = data as SubmissionForm;

    const formatStartDate = (startDate: any) => {
        if (!startDate) return '';

        const dateParts = startDate.split('/');
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[0], 10);
        const year = parseInt(dateParts[2], 10);

        // Function to get the ordinal suffix
        const getOrdinalSuffix = (day: any) => {
            if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, 13th
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        console.log("monthIndex", monthIndex)
        // Format the date
        return `${months[monthIndex]} ${day}${getOrdinalSuffix(day)}, ${year}`;
    };

    const PDFDoc = React.memo(() => (
        <Document style={{
            marginTop: '20px', border: '1px solid #ccc'
        }}>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Image style={styles.image} src={logo} />
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={{
                                fontSize: 14,
                                margin: 0,
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "right",
                                fontWeight: 500,
                            }}>{dateOfIssue} {"\n"} REF: CTS/{dateOfIssue}</Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.candidateName}>{candidateName}</Text>
                    <Text style={styles.title}>Offer of Employment</Text>
                    <Text style={styles.text}>Congratulations! We are pleased to confirm that you have been selected to be part of Compose Tech Services(CTS) Family. We are delighted to make you the following job offer.</Text>
                    <View style={styles.para} />
                    <Text style={styles.subText}>Position Details</Text>
                    <View style={styles.para} />

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={{ ...styles.tableCell, ...styles.tableHeader }}>Field</Text>
                            <Text style={{ ...styles.tableCell, ...styles.tableHeader }}>Details</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Job Title</Text>
                            <Text style={styles.tableCell}>{jobTitle}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Reporting To</Text>
                            <Text style={styles.tableCell}>{reportingTo}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Start Date</Text>
                            <Text style={styles.tableCell}>{startDate}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Employment Type</Text>
                            <Text style={styles.tableCell}>{employmentType}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Annual CTA</Text>
                            <Text style={styles.tableCell}>{annualCTA}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Work Schedule</Text>
                            <Text style={styles.tableCell}>{workScheduleStart} To {workScheduleEnd}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Job Location</Text>
                            <Text style={styles.tableCell}>{jobLocation}</Text>
                        </View>
                    </View>

                    <View style={{ padding: 5 }} />
                    <View style={styles.para} />
                    <Text style={styles.text}>We would like you to start work on or before {formatStartDate(startDate)}. Please report to HR Department on {formatStartDate(startDate)} at {workScheduleStart}, for documentation.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}>Please provide the following documents on the day of reporting:</Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bulletText}>• Photocopy of Passport</Text>
                        <Text style={styles.bulletText}>• Photocopy of Educational Certificates</Text>
                    </View>

                    <Text style={styles.text}>Appointment Letter and Salary Breakup will be provided on Joining Day.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.subText}>Key Points to be Noted</Text>
                    <View style={{ padding: 10 }} />
                    <Text style={styles.text}>
                        <Text style={styles.titleText}>Place/Transfer:</Text> Your present place of work will be Remote. But during the course of the service, you shall be liable to be posted / transferred anywhere to serve any of the Company's Projects or any other establishment in India or outside, at the sole discretion of the Management.
                    </Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}><Text style={styles.titleText}>Probation/Confirmation:</Text> During the probationary period and any extension thereof, your services may be terminated without giving any notice or salary in line thereof. However, on confirmation, the services can be terminated from either side by giving one month's (30 days) notice or salary in lieu thereof.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}><Text style={styles.titleText}>Leave: </Text>You are entitled to paid annual leave, equal to 18 days per annum, taken at a time approved by Compose Tech Services (CTS).</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}>You are entitled to 10 public holidays per annum. Compose Tech Services is to be notified of the dates of these holidays at the commencement of your Service.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.subText}>Terms and Conditions</Text>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>1.</Text> During the period of your employment with the Company, you will devote full time to the work of the Company. Further, you will not take up any other employment or assignment or any office, honorary or for any consideration, in cash or in kind or otherwise, without the prior written permission of the Company.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>2.</Text> You will not (except in the normal course of the Company's business) publish any article or statement, deliver any lecture or broadcast or make any communication to the press, including magazine publication relating to the Company’s products or to any matter with which the Company may be concerned, unless you have previously applied to and obtained the written permission from the Company.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>3.</Text> You will be required to maintain utmost secrecy in respect of Project documents, commercial offer, design documents, Project cost & Estimation, Technology, Software packages license, Company's policies, Company’s patterns & Trademark, and Company's Human assets profile.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>4.</Text> You will be required to comply with all such rules and regulations as the Company may frame from time to time.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>5.</Text> Any of our technical or other important information which might come into your possession during the continuance of your service with us shall not be disclosed, divulged or made public by you even thereafter.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>6.</Text> If at any time in our opinion, which is final in this matter you are found non-performer or guilty of fraud, dishonest, disobedience, disorderly behavior, negligence, indiscipline, absence from duty without permission or any other conduct considered by us deterrent to our interest or of violation of one or more terms of this letter, your services may be terminated without notice and on account of reason of any of the acts or omission the company shall be entitled to recover the damages from you.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>7.</Text> You will not accept any present, commission or any sort of gratification in cash or kind from any person, party or firm or Company having dealing with the company and if you are offered any, you should immediately report the same to the Management.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>8.</Text> This appointment letter is being issued to you on the basis of the information and particulars furnished by you in your application (including biodata), at the time of your interview and subsequent discussions. If it transpires that you have made a false statement (or have not disclosed a material fact) resulting in your being offered this appointment, the Management may take such action as it deems fit in its sole discretion, including termination of your employment.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>9.</Text> Your Salary is paid monthly on the 10th of each month into your nominated bank account.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>10.</Text> You will be responsible for safekeeping and return in good condition and order of all Company property, which may be in your use, custody or charge.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <View style={styles.listItem}>
                        <Text style={styles.text}><Text style={styles.number}>11.</Text> You will receive salary, and all other benefits forming part of your remuneration package subject to, and after, deduction of TDS & professional taxes in accordance with applicable law.</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}>We welcome you to The Compose Tech Services (CTS) family and look forward to a fruitful collaboration.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}>Please sign the copy of this letter and return it to indicate your acceptance to this offer. We are confident you will be able to make a significant contribution to the success of CTS Family and look forward to the opportunity to work with you in an atmosphere that is successful and mutually rewarding.</Text>
                    <View style={{ padding: 5 }} />
                    <Text style={styles.text}>Yours’s Sincerely,</Text>
                    {/* <View style={{ padding: 5 }} />
                        <View style={{ padding: 5 }} /> */}
                    <Image style={{
                        width: 100,
                        display: "flex",
                        alignSelf: "flex-start",
                    }}
                        src={signature}
                    />
                    <Text style={styles.text}>Rentachintala Bhramaramba</Text>
                    <Text style={styles.text}>Director</Text>
                    <Text style={styles.text}>Compose Tech Services Pvt. Ltd.</Text>
                </View>
            </Page>
        </Document>
    ));

    return (
        <PDFViewer style={styles.iframe}>
            <PDFDoc />
        </PDFViewer>
    );
};

export default PdfGenerator;