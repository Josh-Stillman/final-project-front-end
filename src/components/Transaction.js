import React from 'react'
import { Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Transaction = (props) => {

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


  console.log("transaction", props.transaction.business);
  return (
    <Table.Row>
      <Table.Cell>{props.transaction.date}</Table.Cell>
      <Table.Cell>{props.transaction.description}</Table.Cell>
      <Table.Cell>{floatFormatter.format(props.transaction.amount)}</Table.Cell>
      <Table.Cell>
      <Link to="/details" onClick={() => props.set_business(props.transaction.business)}>{props.transaction.business.name}</Link></Table.Cell>
      <Table.Cell>{intFormatter.format(props.transaction.business.total_dem)}</Table.Cell>
      <Table.Cell>{intFormatter.format(props.transaction.business.total_rep)}</Table.Cell>
      <Table.Cell>{pctFormatter(props.transaction.business.total_dem_pct)}</Table.Cell>
      <Table.Cell>{pctFormatter(props.transaction.business.total_rep_pct)}</Table.Cell>
  </Table.Row>
  )
}

export default Transaction
