import React from "react";
import { IContact } from "../interfaces/indext";
import { validateEmail, validateMobile } from "../util/functions";


export default function (formState: IContact): any[]{
      // debugger
    const validationMessages = {
        emptyFullName: "Full name is empty",
        emptyEmailAddress: "Email Addressis empty",
        incorrectEmailAddressFormat: "Wrong format for email address",
        emptyMobile: "Mobile is emoty",
        incorrectMobileFormat: "Wrong format for Mobile",
        emptyCity: 'City is empty',
        emptyId: 'No contact was selected'
    }
    const [validationAction, setValidationAction] = React.useState(0);
    const initvalidationState = {
        fullName: { status: false, text: "" },
        emailAddress: { status: false, text: "" },
        mobile: { status: false, text: "" },
        city: { status: false, text: "" },
        vMessage: "",
        validationAction,
        validationMessages,
    };
    const [validationError, setValidationError] = React.useState(initvalidationState);
    React.useEffect(() => {
          // debugger
        const vMessage = [];
        const { fullName, emailAddress, city, mobile, id } = formState;
        const validateField = (field, status = false, text = "") => {
            setValidationError((prevState) => ({
                ...prevState,
                [field]: {
                    status,
                    text,
                },
            }));
        };
        switch (validationAction) {
            case 0:
                setValidationError((prevState) => ({
                    ...prevState,
                    validationAction: 0,
                    vMessage: "",
                }));
                break;
            case 1:
                if (fullName === "" || fullName === null) {
                    vMessage[0] = validationMessages.emptyFullName;
                    validateField("fullName", true, vMessage[0]);
                } else {
                    vMessage[0] = "";
                    validateField("fullName");
                }
                if (emailAddress === "" || fullName === null) {
                    vMessage[1] = validationMessages.emptyEmailAddress
                    validateField("emailAddress", true, vMessage[1]);
                } else if (!validateEmail(emailAddress)) {
                    vMessage[1] = validationMessages.incorrectEmailAddressFormat
                    validateField("emailAddress", true, vMessage[1])
                } else {
                    vMessage[1] = ""
                    validateField("emailAddress")
                }
                if (mobile === "" || mobile === null) {
                    vMessage[2] = validationMessages.emptyMobile
                    validateField("mobile", true, vMessage[2])
                } else if (!validateMobile(mobile)) {
                    vMessage[2] = validationMessages.incorrectMobileFormat
                    validateField("mobile", true, vMessage[2])
                } else {
                    vMessage[2] = ""
                    validateField("mobile")
                }
                if (city === "" || city === null) {
                    vMessage[3] = validationMessages.emptyCity
                    validateField("city", true, vMessage[3])
                } else {
                    validateField("city")
                }
                break;
            case 2:

                if (fullName === "" || fullName === null) {
                    vMessage[0] = validationMessages.emptyFullName;
                    validateField("fullName", true, vMessage[1]);
                } else {
                    vMessage[0] = "";
                    validateField("fullName");
                }
                if (emailAddress === "" || fullName === null) {
                    vMessage[1] = validationMessages.emptyEmailAddress
                    validateField("emailAddress", true, vMessage[1]);
                } else if (!validateEmail(emailAddress)) {
                    vMessage[1] = validationMessages.incorrectEmailAddressFormat
                    validateField("emailAddress", true, vMessage[1])
                } else {
                    vMessage[1] = ""
                    validateField("emailAddress")
                }
                if (mobile === "" || mobile === null) {
                    vMessage[2] = validationMessages.emptyMobile
                    validateField("mobile", true, vMessage[2])
                } else if (!validateMobile(mobile)) {
                    vMessage[2] = validationMessages.incorrectMobileFormat
                    validateField("mobile", true, vMessage[2])
                } else {
                    vMessage[2] = ""
                    validateField("mobile")
                }
                if (city === "" || city === null) {
                    vMessage[3] = validationMessages.emptyCity
                    validateField("city", true, vMessage[3])
                } else {
                    validateField("city")
                }
                if (id === null || isNaN(id)) {
                    vMessage[4] = validationMessages.emptyId
                } else {
                    vMessage[4] = ""
                }
            case 3:
                  // debugger
                if (fullName === "" || fullName === null) {
                    vMessage[0] = validationMessages.emptyFullName
                    validateField("fullName", true, vMessage[0]);
                } else {
                    vMessage[0] = ""
                    validateField("fullName");
                }
                break;
            case 4:
                if (emailAddress === "" || fullName === null) {
                    vMessage[0] = validationMessages.emptyEmailAddress
                    validateField("emailAddress", true, vMessage[0]);
                } else if (!validateEmail(emailAddress)) {
                    vMessage[0] = validationMessages.incorrectEmailAddressFormat
                    validateField("emailAddress", true, vMessage[0])
                } else {
                    vMessage[0] = ""
                    validateField("emailAddress")
                }
                break;
            case 5:
                if (mobile === "" || mobile === null) {
                    vMessage[0] = validationMessages.emptyMobile
                    validateField("mobile", true, vMessage[0])
                } else if (!validateMobile(mobile)) {
                    vMessage[0]=validationMessages.incorrectMobileFormat
                    validateField("mobile", true, vMessage[0])
                } else {
                    vMessage[0]=""
                    validateField("mobile")
                }
                break;
            case 6:
                if (city === "" || city === null) {
                    vMessage[0] = validationMessages.emptyCity
                    validateField("city", true, vMessage[0])
                } else {
                    vMessage[0]=""
                    validateField("city")
                }
                break;
            default:
                setValidationError(initvalidationState);
                break;
        }
          // debugger;
        setValidationError((prevState) => ({
            ...prevState,
            vMessage: vMessage.filter((str) => str !== "").join(", "),
            validationAction,
        }));
        return () => {
            setValidationAction(0);
        };
    }, [validationAction]);
      // debugger
    return [validationError, setValidationAction];
};
