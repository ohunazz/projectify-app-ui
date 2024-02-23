import React from "react";
import ReactDatePicker from "react-datepicker";
import { trimWhiteSpaces } from "../utils";
import getDate from "date-fns/getDate";
import { Icon } from "../Icon";
import { DatePickerProps } from "./types";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const inputSizeClassNames = {
    sm: "input-small",
    md: "input-medium",
    lg: "input-large"
};

const shapeClassNames = {
    input: {
        rounded: "input-rounded",
        circle: "input-circle"
    },

    datePicker: {
        rounded: "v1-date-picker--rounded",
        circle: "v1-date-picker--circle"
    }
};

const DatePickerV1: React.FC<DatePickerProps> = ({
    selected,
    onSelect,
    onChange,
    placeholder,
    disabled,
    inputSize,
    shape,
    selectsRange,
    startDate,
    endDate
}) => {
    const handleOnSelect = (date: Date) => {
        onSelect && onSelect(date);
    };

    const customizeDay = (_: Date) => {
        return "v1-date-picker__day-wrapper";
    };

    const renderDayContents = (_: number, date: Date) => {
        return <div className="v1-date-picker__day">{getDate(date)}</div>;
    };

    const inputSizeClassName = inputSize ? inputSizeClassNames[inputSize] : "";
    const inputShapeClassName = shape ? shapeClassNames.input[shape] : "";
    const calendarShapeClassName = shape
        ? shapeClassNames.datePicker[shape]
        : "";

    const finalInputClassNames = trimWhiteSpaces(
        `input ${inputSizeClassName} ${inputShapeClassName}`
    );

    const finalCalendarClassNames = trimWhiteSpaces(
        `v1-date-picker ${calendarShapeClassName} ${
            inputSize && inputSize === "lg" ? "v1-date-picker--lg" : ""
        }`
    );
    return (
        <ReactDatePicker
            selected={selected}
            onSelect={handleOnSelect}
            onChange={onChange}
            className={finalInputClassNames}
            placeholderText={placeholder}
            disabled={disabled}
            dayClassName={customizeDay}
            renderDayContents={renderDayContents}
            calendarClassName={finalCalendarClassNames}
            showIcon
            selectsRange={selectsRange}
            icon={
                <Icon
                    iconName="calendar"
                    className="v1-date-picker__calendar-icon"
                />
            }
            toggleCalendarOnIconClick
            startDate={startDate}
            endDate={endDate}
        />
    );
};

export { DatePickerV1 };
