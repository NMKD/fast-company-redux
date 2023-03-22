/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({
    options,
    onChange,
    label,
    name,
    defaultValue,
    isLoading
}) => {
    const optionsArray =
        !isLoading && !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((opt) => ({
                  label: options[opt].name,
                  value: options[opt]._id
              }))
            : options;

    const defaultValueArray =
        !isLoading &&
        !Array.isArray(defaultValue) &&
        typeof defaultValue === "object"
            ? Object.keys(defaultValue).map((opt) => ({
                  label: defaultValue[opt].name,
                  value: defaultValue[opt]._id
              }))
            : defaultValue;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    if (isLoading) {
        return <span>Loading...</span>;
    }

    return (
        <div>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                classNamePrefix="select"
                className="basic-multi-select"
                onChange={handleChange}
                defaultValue={defaultValueArray}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool
};

export default MultiSelectField;
