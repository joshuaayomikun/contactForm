import * as React from "react"
import { Button } from "@chakra-ui/button"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Stack, Link as RLink } from "@chakra-ui/react"
import { Container } from "next/app"
import useContactForm from '../hooks/contactForm'
import useValidateContactForm from "../hooks/contactFormValidation";
import formConstant from "../util/formConstant"
import { useDispatch, useSelector } from 'react-redux'
import { addContact, editContact, disableSuccess, selectSuccess, setCurrentId , selectCurrentId, selectContacts} from "../redux/reducers"
import { useRouter } from 'next/router'
import Link from "next/link"
import { IContact } from "../interfaces/indext"

export default ({ formAction }) => {
    const [formState, setFormValue] = useContactForm()
    const [validationError, setValidationAction] = useValidateContactForm(formState)
    const dispatch = useDispatch()
    const success = useSelector(selectSuccess)
    const currentId = useSelector(selectCurrentId)
    const contacts: IContact[] = useSelector(selectContacts)
    const router = useRouter()
    const { id } = router.query
    React.useEffect(() => {
        // debugger
        if (formAction === 2) {
            if(typeof id !== "undefined"){
                if(typeof contacts[+id] !== "undefined") {
                    setFormValue({ field: "setAll", value: contacts[+id] })
                } else {
                    router.push('/createContact')
                }
            }
        }
    }, [formAction, id])
    React.useEffect(() => {
        if(currentId > -1 && formAction === 2) {
        }
    }, [currentId])
    React.useEffect(() => {
        // debugger
        if (success) {
            alert("Contact Created!")
            router.push('./viewContacts')
        }
        return () => {
            dispatch(disableSuccess())
        }
    }, [success])
    React.useEffect(() => {
        // debugger
        if (formState.presentAction > 0)
            setValidationAction(formState.presentAction)
    }, [formState.presentAction])

    React.useEffect(() => {
        // debugger
        if (validationError.validationAction === formAction && validationError.vMessage === "") {
            switch (validationError.validationAction) {
                case 1:
                    dispatch(addContact(formState))
                    break
                case 2:
                    dispatch(editContact(formState))
                    break;
            }
        }
    }, [validationError.validationAction])
    return <Box display="flex">
        <Box marginX="auto" marginTop="10">
            <Box display="flex" justifyContent="space-between">
                <RLink as={Link} href="./">Home</RLink>
                <RLink as={Link} href="/viewContacts">View Contacts</RLink>
            </Box>
            <form onSubmit={(e) => {
                e.preventDefault()
                setValidationAction(formAction)
            }}>
                <Container>
                    <Stack spacing={3}>
                        <FormControl id="name">
                            <FormLabel>Full Name</FormLabel>
                            <Input type="text" placeholder="(First name Last name)" value={formState.fullName} variant="outline" isInvalid={validationError.fullName.status} errorBorderColor="crimson" onChange={(e) => {
                                setFormValue({ field: "fullName", value: e.target.value, presentAction: 3 })
                            }} />
                            <FormHelperText color="crimson">{validationError.fullName.text}</FormHelperText>
                        </FormControl>
                        <FormControl id="emailAddress">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" placeholder="johndoe@mail.com" value={formState.emailAddress} variant="outline" isInvalid={validationError.emailAddress.status} errorBorderColor="crimson" onChange={(e) => {
                                setFormValue({ field: "emailAddress", value: e.target.value, presentAction: 4 })
                            }} />
                            <FormHelperText color="crimson">{validationError.emailAddress.text}</FormHelperText>
                        </FormControl>
                        <FormControl id="mobile">
                            <FormLabel>Mobile</FormLabel>
                            <Input type="text" placeholder="xxxxxxxxxxx" value={formState.mobile} variant="outline" isInvalid={validationError.mobile.status} errorBorderColor="crimson" onChange={(e) => {
                                setFormValue({ field: "mobile", value: e.target.value, presentAction: 5 })
                            }} />
                            <FormHelperText color="crimson">{validationError.mobile.text}</FormHelperText>
                        </FormControl>
                        <FormControl id="city">
                            <FormLabel>City</FormLabel>
                            <Input type="city" placeholder="Inout your city here" value={formState.city} variant="outline" isInvalid={validationError.city.status} errorBorderColor="crimson" onChange={(e) => {
                                setFormValue({ field: "city", value: e.target.value, presentAction: 6 })
                            }} />
                            <FormHelperText color="crimson">{validationError.city.text}</FormHelperText>
                        </FormControl>
                        <Button type="submit" isDisabled={validationError.vMessage !== ""}>{formConstant[String(formAction)]}</Button>
                    </Stack>
                </Container>
            </form>
        </Box>
    </Box>
}