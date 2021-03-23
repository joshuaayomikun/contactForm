import { Box, Container, Link as RLink, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'



export default () => {
  return (
    <>
      <Head>
        <title>Welcom to Contact Form</title>
      </Head>
      <Container height="100%" marginTop="10" border="1px" padding="17" borderColor="gray.200">
        <Text fontSize="5xl">Hi there  {String.fromCodePoint(0x1F44B)}</Text>

        <Text fontSize="3xl">Welcome to My Contact app</Text>
        <Text>This App displays all the contacts inputed on this platform. You can add a new contact by clicking on thr add button below. you can also view the existing contacts by clicking the view button below.</Text>
        <Box display="flex" flexWrap="wrap" marginTop="6" justifyContent="space-between" >
          <RLink as={Link} href="/createContact" marginY="3" border="1px">Create New Contact</RLink>
          <RLink as={Link} href="/viewContacts" marginY="3">View Contacts</RLink>
        </Box>
      </Container>
    </>
  )
}
