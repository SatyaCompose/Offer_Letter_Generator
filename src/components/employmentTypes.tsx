import React, { useState } from 'react';
import { employmentTypes } from '../common/constant';
import './styles/employmentTypes.css';

interface EmploymentTypeDropdownProps{
    onOptionSelect?: (option: string) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
}

const EmploymentTypeDropdown: React.FC<EmploymentTypeDropdownProps> = ({onOptionSelect, touched, errors}) => {
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleDropdown = () => {
        console.log("Dropdown toggled");
        setIsOpen(!isOpen);
        console.log("Open", !isOpen);
    };

    const handleOptionSelect = (type: string) => {
        console.log("Option selected:", type);
        setSelectedOption(type);
        setIsOpen(false);

        // Send the selected option value
        if (onOptionSelect) {
            onOptionSelect(type);
        }

        if (!type) {
            setErrorMessage('Please select a valid option.');
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div className="custom-dropdown">
            <label>
                <span>Employment Type <span style={{ color: 'red' }}>*</span></span>                
                <div className="dropdown-container">
                    <div className="dropdown-selected" onClick={toggleDropdown}>{selectedOption}</div>
                    {isOpen && (
                        <div className={`dropdown-options ${isOpen ? 'show' : ''}`}>
                            <div
                                className={`dropdown-option ${touched.startDate && errors.startDate ? 'error-border' : ''}`}
                                data-value=""
                                onClick={() => handleOptionSelect('')}
                            >
                                Select an option
                            </div>
                            {employmentTypes.map((type) => (
                                <div
                                    className={`dropdown-option ${touched.startDate && errors.startDate ? 'error-border' : ''}`}
                                    data-value={type}
                                    key={type}
                                    onClick={() => handleOptionSelect(type)}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {errorMessage && <div className="error-message" id="error-message">{errorMessage}</div>}
            </label>
        </div>
    );
};

export default EmploymentTypeDropdown;
