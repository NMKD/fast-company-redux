import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import SelectField from "./fields/selectField";
import RadioField from "./fields/radioField";
import MultiSelectField from "./fields/multiSelectField";
import { validate } from "../../../utils/validate";
import { validationSchema } from "../../../utils/validationSchema";
import CheckBoxField from "./fields/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getQualitiesState } from "../../../store/qualities";
import {
    getProfessionsLoading,
    getProfessionsState
} from "../../../store/profession";
import { signUp } from "../../../store/user";
import { toast } from "react-toastify";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: true
    });

    const professions = useSelector(getProfessionsState());
    const stateQualities = useSelector(getQualitiesState());
    const isLoadingQual = useSelector(getLoading());
    const isLoadingProf = useSelector(getProfessionsLoading());

    const qualitiesList =
        !isLoadingProf &&
        stateQualities.map((item) => ({
            label: item.name,
            value: item._id
        }));
    const { name, email, password, profession, sex, licence } = data;
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;
    const radioOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            signUp({
                ...data,
                qualities: data.qualities.map((item) => item.value),
                profession: professions.filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(data.profession.toLowerCase())
                )[0]._id
            })
        );
        toast.success("Пользователь зарегистрирован");
    };

    const handleChangeData = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        const errors = validate(data, validationSchema);
        setErrors(errors);
    }, [data]);

    return (
        <form className="g-3 needs-validation" onSubmit={handleSubmit}>
            <TextField
                label="ФИО"
                name="name"
                value={name}
                onChange={handleChangeData}
                error={errors.name}
            />
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
            <SelectField
                label="Выбрать профессию:"
                defaulOption="Choose..."
                options={professions}
                onChange={handleChangeData}
                name="profession"
                value={profession}
                isLoading={isLoadingProf}
                error={errors.profession}
            />
            <MultiSelectField
                label="Выбрать качества:"
                options={qualitiesList}
                defaultValue={data.qualities}
                name="qualities"
                isLoading={isLoadingQual}
                onChange={handleChangeData}
            />
            <RadioField
                label="Выбрать пол: "
                options={radioOptions}
                name="sex"
                value={sex}
                onChange={handleChangeData}
            />

            <button
                className="btn btn-success mt-3 mb-3"
                type="submit"
                disabled={isValid}
            >
                Отправить
            </button>

            <CheckBoxField
                value={licence}
                onChange={handleChangeData}
                name="licence"
                errors={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
        </form>
    );
};

export default SignUpForm;
