import * as React from "react";
import { IContact, IObjectFill } from "../interfaces/indext";

export default function (): (any)[] {
    const initFormState: IContact = {
        fullName: "",
        emailAddress: "",
        mobile: "",
        city: "",
        submit: false,
        presentAction: 0,
    };
    const objectFill: IObjectFill = { field: "", value: "" }
    const [formState, setFormState] = React.useState(initFormState);
    const [formValue, setFormValue] = React.useState(objectFill);
    //   // debugger
    React.useEffect(() => {
        // debugger
        if (formValue.field !== "") {
            //debugger
            if (formValue.field === "setAll") {
                setFormState(formValue.value)
            } else {
                setFormState(prevState => ({ ...prevState, [formValue.field]: formValue.value, presentAction: formValue.presentAction }))
                setFormValue({ field: "", value: "", presentAction: 0 })
            }
        }
        return () => {
            setFormState(prevState => ({ ...prevState, presentAction: 0 }))
        }
    }, [formValue])

    return [formState, setFormValue]
}