import * as React from 'react'

import styled from 'styled-components'
import { Table as RTable, Thead, Tbody, Tr, Th, Td, chakra, Button } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"
import { Box, Container, Link as RLink } from '@chakra-ui/layout'
import { useSelector, useDispatch } from 'react-redux'
import { editContact, selectActiveContact, deleteContact, selectSuccess, disableSuccess } from '../redux/reducers'
import Link from 'next/link'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

    // Render the UI for your table
    return (
        <RTable {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                isNumeric={column.isNumeric}
                            >
                                {column.render("Header")}
                                <chakra.span pl="4">
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                        ) : (
                                            <TriangleUpIcon aria-label="sorted ascending" />
                                        )
                                    ) : null}
                                </chakra.span>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                        </Tr>
                    )
                })}
            </Tbody>
        </RTable>
    )
}

export default () => {
    const dispatch = useDispatch()
    const activeContact = useSelector(selectActiveContact)
    const success = useSelector(selectSuccess)
    const [data, setData] = React.useState(activeContact)
    const [columns, setColumns] = React.useState([
            {
                Header: 'Contacts',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'fullName',
                    },
                    {
                        Header: 'Email',
                        accessor: 'emailAddress',
                    },
                    {
                        Header: 'Mobile',
                        accessor: 'mobile',
                    },
                    {
                        Header: 'City',
                        accessor: 'city',
                    },
                    {
                        id: 'editbutton',
                        accessor: 'id',
                        Cell: ({ value }) => (<RLink as={Link} href={`editContact/${value}`} >Edit</RLink>)
                    },
                    {
                        id: 'deletbutton',
                        accessor: 'id',
                        Cell: ({ value }) => (<Button onClick={(e) => {
                            e.preventDefault()
                            if(confirm("Are you sure you want to delete!"))
                            dispatch(deleteContact(data[+value]))
                        }} >Delete</Button>)
                    }
                ],
            },
        ])

        React.useEffect(() => {
            debugger
            if(success) {
                alert("Deleted Sucessfullt!")
                setData(activeContact)
            }
            return () => {
                dispatch(disableSuccess())
            }
        },[success])

    return (
        <Container>

            <Box display="flex" justifyContent="space-between">
                <RLink as={Link} href="./">Home</RLink>
                <RLink as={Link} href="./createContact">Create Contacts</RLink>
            </Box>
            <Styles>
                <Table columns={columns} data={data} />
            </Styles>
        </Container>
    )
}
