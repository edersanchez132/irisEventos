class AuthValidate {

    validParams(email){
        let errors = [];

        if (!email) {
            errors.push("Email requerido.");
        } else if (!validEmail(email)) {
            errors.push("Ingrese un email válido.");
        }

        if (errors.length) return true
    }

    validEmail(mail) {

        let gmail = "gmail";
        let hotmail = "hotmail";

        let posicion1 = mail.toLowerCase().indexOf(gmail.toLowerCase());
        let posicion2 = mail.toLowerCase().indexOf(hotmail.toLowerCase());

        if (posicion1 >= 0)
            return false

        if (posicion2 >= 0)
            return false

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    validNumber(number){
        const regex = /^[0-9]*$/;
        const onlyNumbers = regex.test(number); 
        if (onlyNumbers) {
            return true
        }
    }

    validNumberLength(number){

        const regxp = /^([0-9]){5,10}$/;
        const lenghtNumbers = regxp.test(number); 
        if (lenghtNumbers) {
            return true
        }
    }

}

export default new AuthValidate();
