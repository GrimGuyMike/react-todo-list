const { ApiError } = require("../exception");

class ValidationService {
    name(name) {
        const regExp = /(?=^.{6,51}$)([A-Za-z]{1})([A-Za-z0-9!@#$%_\^\&amp;\*\-\.\?]{5,49})$/;
        if(!regExp.test(name)) throw ApiError.BadRequest('invalid user name');
    };

    email(email) {
        const regExp = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
        if(!regExp.test(email)) throw ApiError.BadRequest('invalid email');
    };
    
    password(password) {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if(!regExp.test(password)) throw ApiError.BadRequest('invalid password');
    };

    todoText(text) {
        if(text.startsWith(' ')) throw ApiError.BadRequest('todo text must not start with whitespace');
    }
};

module.exports = new ValidationService();