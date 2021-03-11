import { Container, Heading } from "@chakra-ui/react"

export default ({ children }) => {
    return <Container>
        <Heading>Contact App</Heading>
        {children}
    </Container>
}