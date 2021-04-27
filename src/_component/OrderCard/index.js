import React, { Component } from 'react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova',
    },
    createdAt: 1555016400000,
    status: 'Approve',
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu',
    },
    createdAt: 1555016400000,
    status: 'Approve',
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson',
    },
    createdAt: 1554930000000,
    status: 'Approve',
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer',
    },
    createdAt: 1554757200000,
    status: 'Approve',
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert',
    },
    createdAt: 1554670800000,
    status: 'Approve',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov',
    },
    createdAt: 1554670800000,
    status: 'Approve',
  },
]

const OrderCard = props => {
    const classes = useStyles();
  return (
    <Card {...props} className={classes.root} variant="outlined">
      <CardHeader title="Latest" />
      <Divider />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow hover key={order.id}>
                <TableCell>{order.ref}</TableCell>
                <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Chip color="primary" label={order.status} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}
const useStyles = makeStyles(theme => ({
  root: {
    width: 368,
    borderRadius: 0,
  },
}))
export default OrderCard
