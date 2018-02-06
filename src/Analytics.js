import React from 'react'
import { Table, Header, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'
import { VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel, VictoryPortal, VictoryTooltip, VictoryLegend } from 'victory';


class Analytics extends React.Component {
  constructor(){
    super()
    this.state = {
      tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)}`,
      x: "total_rep",
      y: "total_rep_pct",
      x_label: "Amount to Republicans (2016-2018)",
      y_label: "% To Republicans",
      title: "Donations to Republicans",
      buttonText: "Show Democrats"
    }
  }

  flip = () => {
    if (this.state.x === "total_rep") {
      this.setState({
        tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)}`,
        x: "total_dem",
        y: "total_dem_pct",
        x_label: "Amount to Democrats (2016-2018)",
        y_label: "% to Democrats",
        title: "Donations to Democrats",
        buttonText: "Show Republicans"
      })
    } else {
      this.setState({
        tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)}`,
        x: "total_rep",
        y: "total_rep_pct",
        x_label: "Amount to Republicans (2016-2018)",
        y_label: "% to Republicans",
        title: "Donations to Republicans",
        buttonText: "Show Democrats"
      })
    }
  }



  render(){
    return (
      <React.Fragment>
      <VictoryChart animate={{ duration: 1000, easing: "QuadInOut" }} domainPadding={10} containerComponent={<VictoryVoronoiContainer
        voronoiPadding={5} radius={25} labels={this.state.tooltip} labelComponent={<VictoryTooltip style={{fontSize: 9}}/>} renderInPortal="false"
        />}>
        <VictoryLabel text={this.state.title} x={225} y={30} textAnchor="middle"/>
        <VictoryLabel style={{fontSize: 8}} text="Size = Your Spending" x={225} y={45} textAnchor="middle"/>

      <VictoryAxis
          label={this.state.x_label}
          axisLabelComponent={<VictoryLabel y={280} style={{fontSize: 10}}/>}
          domain={[-1, 10]}

          tickFormat={(x) => (`$${x / 1000000}m`)}
        />
        <VictoryAxis

          label={this.state.y_label}
          axisLabelComponent={<VictoryLabel x={10} style={{fontSize: 10}} />}
          dependentAxis
          offsetX={50}
          tickFormat={(x) => (`${x * 100}%`)}
        />

      <VictoryScatter
      style={{
        data: {
          fill: (d) => {if (d.total_dem_pct > .55) {
            return "3399ff"
          } else if (d.total_dem_pct < .45) {
            return "#c43a31"
          } else {
            return "#ee7600"
          }
        }
      }}}

        bubbleProperty="user_total_spending"
        maxBubbleSize={25}
        minBubbleSize={5}
        data={this.props.businesses} x={this.state.x} y={this.state.y}/>
      </VictoryChart>
      <Button onClick={this.flip}>{this.state.buttonText}</Button>
      </React.Fragment>
    )
  }

}



const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
  }
}



export default connect(mapStateToProps, actions)(Analytics)
