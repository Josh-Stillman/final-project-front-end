import React from 'react'
import { Table, Header, Icon, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'
import { VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel, VictoryPortal, VictoryTooltip, VictoryLegend } from 'victory';
import {myStates} from './AnalyticsStates'


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
      buttonText: "Show Democrats",
      legendTitle: "Size = Your Spending",
      bizButtonActive: true,
      bubbleSize: "user_total_spending",
      xAxisDomain: [-1, 10],
      xAxisTickFormat: (x) => (`$${x / 1000000}m`)
    }


  }
//
//
//    myStates = () => {
//      return {
//     bizRep: {
//       tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)} to Rs`,
//       x: "total_rep",
//       y: "total_rep_pct",
//       x_label: "Amount to Republicans (2016-2018)",
//       y_label: "% to Republicans",
//       title: "Donations to Republicans",
//       buttonText: "Show Democrats",
//       legendTitle: "Size = Your Spending",
//       bizButtonActive: true
//     },
//     bizDem: {
//       tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
//       x: "total_dem",
//       y: "total_dem_pct",
//       x_label: "Amount to Democrats (2016-2018)",
//       y_label: "% to Democrats",
//       title: "Donations to Democrats",
//       buttonText: "Show Republicans",
//       legendTitle: "Size = Your Spending",
//       bizButtonActive: true
//     },
//     userRep: {
//       tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)} to Rs`,
//       x: "user_total_spending",
//       y: "total_rep_pct",
//       x_label: "Your Spending at the Business",
//       y_label: "% to Republicans",
//       title: "Your Spending",
//       buttonText: "Show Democrats",
//       legendTitle: "Size = Amount to Republicans (2016-2018)",
//       bizButtonActive: false
//     },
//     userDem: {
//       tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
//       x: "user_total_spending",
//       y: "total_dem_pct",
//       x_label: "Your Spending at the Business",
//       y_label: "% to Democrats",
//       title: "Your Spending",
//       buttonText: "Show Republicans",
//       legendTitle: "Size = Amount to Democrats (2016-2018)",
//       bizButtonActive: false
//     }
//
//   }
// }
  //set dataset changes what you're displaying
  //flip checks the current dataset and flips it accordingly


  flipParty = (event) => {

    console.log("button", event.target);
    if (this.state.bizButtonActive) {
      if (this.state.x === "total_rep") {
        this.setState(myStates.bizDem)
      } else {
        this.setState(myStates.bizRep)
      }
    } else if (!this.state.bizButtonActive) {
      if (this.state.y === "total_rep_pct") {
        this.setState(myStates.userDem)
      } else {
        this.setState(myStates.userRep)
      }
    }
  }

  flipGraph = () => {
    if (this.state.bizButtonActive) {
      this.setState(myStates.userRep)
    } else {
      this.setState(myStates.bizRep)
    }
  }
  flipGraphUser = () => {
    if (this.state.bizButtonActive) {
      this.setState(myStates.userRep)
    } else {

    }
  }
  flipGraphBiz= () => {
    if (!this.state.bizButtonActive) {
      this.setState(myStates.bizRep)
    } else {

    }
  }

    // if (this.state.x === "total_rep") {
    //   this.setState({
    //     tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
    //     x: "total_dem",
    //     y: "total_dem_pct",
    //     x_label: "Amount to Democrats (2016-2018)",
    //     y_label: "% to Democrats",
    //     title: "Donations to Democrats",
    //     buttonText: "Show Republicans"
    //   })
    // } else {
    //   this.setState({
    //     tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)}`,
    //     x: "total_rep",
    //     y: "total_rep_pct",
    //     x_label: "Amount to Republicans (2016-2018)",
    //     y_label: "% to Republicans",
    //     title: "Donations to Republicans",
    //     buttonText: "Show Democrats"
    //   })
    // }
  // }



  render(){
    console.log(this.props.businesses);
    return (
      <React.Fragment>
      <Container>
        <Button.Group >
          <Button onClick={this.flipGraphBiz} active={this.state.bizButtonActive}>Business Spending    <Icon name="building outline"/><Icon name="dollar"/></Button>
          <Button onClick={this.flipGraphUser} active={!this.state.bizButtonActive}>User Spending     <Icon name="user outline"/><Icon name="dollar"/></Button>
        </Button.Group>
      <VictoryChart domainPadding={10} containerComponent={<VictoryVoronoiContainer
        voronoiPadding={5} radius={25} labels={this.state.tooltip} labelComponent={<VictoryTooltip width="115" style={{fontSize: 8}}/>} renderInPortal="false"
        />}>
        <VictoryLabel text={this.state.title} x={225} y={30} textAnchor="middle"/>


          <VictoryLegend x={315} y={15}
          	title={this.state.legendTitle}
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
          domain={this.state.xAxisDomain}

          tickFormat={this.state.xAxisTickFormat}
        />
        <VictoryAxis

          label={this.state.y_label}
          axisLabelComponent={<VictoryLabel x={10} style={{fontSize: 10}} />}
          dependentAxis
          offsetX={50}
          tickFormat={(x) => (`${x * 100}%`)}
        />

      <VictoryScatter
        animate={{ duration: 1000, delay: 0}}
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

        bubbleProperty={this.state.bubbleSize}
        maxBubbleSize={25}
        minBubbleSize={5}
        data={this.props.businesses} amount={this.state.bubbleSize} x={this.state.x} y={this.state.y}/>
      </VictoryChart>
      <Button size='massive'color={this.state.buttonText === "Show Democrats" ? "blue" : "red"} onClick={this.flipParty}>{this.state.buttonText}</Button>
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
