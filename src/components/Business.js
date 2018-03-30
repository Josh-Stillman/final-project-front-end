import React from 'react'
import { Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Details from '../containers/Details'

const Business = (props) => {

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



  return (
    <Table.Row>
      <Table.Cell><Link to="/details" onClick={() => props.set_business(props.business)}>{props.business.name}</Link></Table.Cell>
      <Table.Cell>{intFormatter.format(props.business.total_dem)}</Table.Cell>
      <Table.Cell>{intFormatter.format(props.business.total_rep)}</Table.Cell>
      <Table.Cell>{pctFormatter(props.business.total_dem_pct)}</Table.Cell>
      <Table.Cell>{pctFormatter(props.business.total_rep_pct)}</Table.Cell>
      <Table.Cell>{floatFormatter.format(props.business.user_total_spending)}</Table.Cell>
  </Table.Row>
  )
}

export default Business
