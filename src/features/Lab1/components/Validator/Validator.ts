import {MAX_N} from "../../../../constants/Lab1Constant/Lab1Constants";

export default class Validator {

    public ValidateM(m : any){
        if (m !== "") {
            if (this.ValidateInt(m)) {
                m = Number(m);
                if (m <= 0) {
                    return("m is less than 0")
                }
                else {
                    return ("")
                }
            } else {
                return("m is not an integer")
            }
        }
        else{
            return("m has to be more than 0 and integer")
        }
    }

    public ValidateAnotherProps(property: any, m: any, propertyName: string){
        if (property !== "") {
            if (this.ValidateInt(property) || property === "0"){
                property = Number(property);
                if (property < 0) {
                    return(propertyName + " is less than 0")
                }
                else if (property > Number(m)){
                    return(propertyName + " is bigger than m")
                }
                else {
                    return ("")
                }
            } else {
                return(propertyName +" is not an integer")
            }
        }
        else{
            return(propertyName + " has to be more than or equal to 0, less than m and integer")
        }
    }

    public ValidateN(n : any){
        if (n !== "") {
            if (this.ValidateInt(n) || n === "0") {
                n = Number(n);
                if (n <= 0) {
                    return("n is less than or equal to 0")
                }
                else if (n >= MAX_N){
                    return("n is bigger than " + MAX_N)
                }
                else {
                    return ("")
                }
            } else {
                return("n is not an integer")
            }
        }
        else{
            return("n has to be more than 0 and less than " + MAX_N)
        }
    }

    private ValidateInt(value : any){
        return Number(value) && !value.includes(".")
    }
}

