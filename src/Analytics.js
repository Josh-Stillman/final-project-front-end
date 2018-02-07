import React from 'react'
import { Table, Header, Icon, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'
import { VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel, VictoryPortal, VictoryTooltip, VictoryLegend } from 'victory';


class Analytics extends React.Component {
  constructor(){
    super()
    this.state = {
      tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)} to Rs`,
      x: "total_rep",
      y: "total_rep_pct",
      x_label: "Amount to Republicans (2016-2018)",
      y_label: "% to Republicans",
      title: "Donations to Republicans",
      buttonText: "Show Democrats"
    }
  }

  flip = () => {
    if (this.state.x === "total_rep") {
      this.setState({
        tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
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
    console.log(this.props.businesses);
    return (
      <React.Fragment>
      <Container>
      <VictoryChart animate={{ duration: 1000, delay: 0 }} domainPadding={10} containerComponent={<VictoryVoronoiContainer  animate={{

              delay: 0}}
        voronoiPadding={5} radius={25} labels={this.state.tooltip} labelComponent={<VictoryTooltip width="115" style={{fontSize: 8}}/>} renderInPortal="false"
        />}>
        <VictoryLabel text={this.state.title} x={225} y={30} textAnchor="middle"/>


          <VictoryLegend x={325} y={15}
          	title="Size = Your Spending"
            centerTitle
            orientation="horizontal"
            gutter={5}
            style={{ border: { stroke: "black" }, title: {fontSize: 6 } }}
              data={[
                { name: "Leans D", symbol: { fill: "3399ff"}, labels: {fontSize: 6} },
                { name: "Leans R", symbol: { fill: "#c43a31" }, labels: {fontSize: 6} },
                { name: "Gives to Both", symbol: { fill: "#ee7600" }, labels: {fontSize: 6} }
              ]}
          />

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
      <Button size='massive'color={this.state.buttonText === "Show Democrats" ? "blue" : "red"} onClick={this.flip}>{this.state.buttonText}</Button>
      </Container>
      </React.Fragment>
    )
  }

}



const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
  }
}
//        <VictoryLabel style={{fontSize: 8}} text="Size = Your Spending" x={225} y={45} textAnchor="middle"/>


export default connect(mapStateToProps, actions)(Analytics)
