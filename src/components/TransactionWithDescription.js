import React from 'react'
import { Table } from 'semantic-ui-react'

const TransactionWithDescription = (props) => {

  let floatFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  let intFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const pctFormatter = (string) => {
    return Number(string).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})

  }


  console.log("transaction with original", props.transaction);
  return (
    <Table.Row>
      <Table.Cell>{props.transaction.date}</Table.Cell>
      <Table.Cell>{props.transaction.description}</Table.Cell>
      <Table.Cell>{props.transaction.original}</Table.Cell>
      <Table.Cell>{floatFormatter.format(props.transaction.amount)}</Table.Cell>
  </Table.Row>
  )
}

export default TransactionWithDescription
