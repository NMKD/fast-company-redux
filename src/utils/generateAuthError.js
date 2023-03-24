/* eslint-disable indent */
function generateAuthError(message) {
    switch (message) {
        case "EMAIL_EXISTS": {
            return "Email или пароль введены неверно";
        }
        case "INVALID_PASSWORD": {
            return "Пароль введен неверно";
        }
        case "EMAIL_NOT_FOUND": {
            return "Email не найден";
        }

        default: {
            return "Слишком много попыток входа. Попробуйте позже или пройдите регистрацию";
        }
    }
}

export default generateAuthError;
