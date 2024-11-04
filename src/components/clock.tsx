import React, { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './styles/clock.css';

interface WorkScheduleProps {
    onStart?: (time: string) => void;
    onEnd?: (time: string) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
}

const WorkSchedule: React.FC<WorkScheduleProps> = ({ onStart, onEnd, touched, errors }) => {
    const [workScheduleStart, setWorkScheduleStart] = useState<Dayjs>();
    const [workScheduleEnd, setWorkScheduleEnd] = useState<Dayjs>();

    const handleStartChange = (time: Dayjs) => {
        setWorkScheduleStart(time);
        if (onStart) {
            onStart(dayjs(time)?.format('hh:mm A'));
        }
    };

    const handleEndChange = (time: Dayjs) => {
        setWorkScheduleEnd(time);
        if (onEnd) {
            onEnd(dayjs(time)?.format('hh:mm A'));
        }
    };
console.log(touched) 
console.log(errors)
    return (
        <div className="work-schedule">
            <label>
                <span>Work Schedule<span style={{ color: 'red' }}>*</span></span>
            </label>
            <div className="time-fields">
                <label className="clock-label">
                    <TimePicker
                        onChange={handleStartChange}
                        value={workScheduleStart}
                        format="hh:mm A"
                        className={`custom-time-picker ${touched.workScheduleStart && errors.workScheduleStart ? 'error-border' : ''}`}
                    />
                    <span>To</span>
                    <TimePicker
                        onChange={handleEndChange}
                        value={workScheduleEnd}
                        format="hh:mm A"
                        className={`custom-time-picker ${touched.workScheduleEnd && errors.workScheduleEnd ? 'error-border' : ''}`}
                    />
                </label>
            </div>
        </div>
    );
};

export default WorkSchedule;
