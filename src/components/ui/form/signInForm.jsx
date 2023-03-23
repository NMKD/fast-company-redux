import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import CheckBoxField from "./fields/checkBoxField";
import { yupValidationSingIn } from "../../../utils/validationSchema";
import { useDispatch } from "react-redux";
import { signIn } from "../../../store/user";

const SingInForm = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: true
    });
    const { email, password, stayOn } = data;
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(data));
    };

    const handleChangeData = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        yupValidationSingIn
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
    }, [data]);

    return (
        <form className="g-3 needs-validation" onSubmit={handleSubmit}>
            <TextField
                label="Почта"
                name="email"
                value={email}
                onChange={handleChangeData}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={handleChangeData}
                error={errors.password}
            />

            <button
                className="btn btn-success mt-3 mb-3"
                type="submit"
                disabled={isValid}
            >
                Отправить
            </button>

            <CheckBoxField
                value={stayOn}
                onChange={handleChangeData}
                name="licence"
            >
                Оставаться в системе
            </CheckBoxField>
        </form>
    );
};

export default SingInForm;
