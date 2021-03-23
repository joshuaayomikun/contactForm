import { Container, Heading } from "@chakra-ui/react"

export default ({ children }) => {
    return <Container>
        <Heading textAlign="center">Contact App</Heading>
        {children}
    </Container>
}