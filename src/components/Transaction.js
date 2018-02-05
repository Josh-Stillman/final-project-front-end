import React from 'react'
import { Table } from 'semantic-ui-react'

const Transaction = (props) => {

  return (
    <Table.Row>
      <Table.Cell>{props.transaction.date}</Table.Cell>
      <Table.Cell>{props.transaction.description}</Table.Cell>
      <Table.Cell>{props.transaction.amount}</Table.Cell>
      <Table.Cell>{props.transaction.business.name}</Table.Cell>
      <Table.Cell>{props.transaction.business.total_dem}</Table.Cell>
      <Table.Cell>{props.transaction.business.total_rep}</Table.Cell>
      <Table.Cell>{props.transaction.business.total_dem_pct}</Table.Cell>
      <Table.Cell>{props.transaction.business.total_rep_pct}</Table.Cell>
  </Table.Row>
  )
}

export default Transaction
