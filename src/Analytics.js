import React from 'react'
import { Table, Header, Icon, Button, Container, Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'
import { createContainer, VictoryZoomContainer, VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel, VictoryPortal, VictoryTooltip, VictoryLegend } from 'victory';
import {myStates} from './AnalyticsStates'
import withAuth from './hocs/withAuth'


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


  hasBusinesses = () => {
    const VictoryZoomVoronoiContainer = createContainer("voronoi", "zoom");
    return (
      <Container>
        <Button.Group >
          <Button onClick={this.flipGraphBiz} active={this.state.bizButtonActive}>Business Spending    <Icon name="building outline"/><Icon name="dollar"/></Button>
          <Button onClick={this.flipGraphUser} active={!this.state.bizButtonActive}>User Spending     <Icon name="user outline"/><Icon name="dollar"/></Button>
        </Button.Group>

      <VictoryChart domainPadding={10} containerComponent={<VictoryZoomContainer animate={{ duration: 1000, delay: 0}}
         voronoiPadding={5} radius={25} renderInPortal="false"
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

      <VictoryScatter labels={this.state.tooltip} labelComponent={<VictoryTooltip width="115" style={{fontSize: 8}}/>}
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
        },
         fillOpacity: .7,
         strokeWidth: 3

      }}}

        bubbleProperty={this.state.bubbleSize}
        maxBubbleSize={25}
        minBubbleSize={5}
        data={this.props.businesses} amount={this.state.bubbleSize} x={this.state.x} y={this.state.y}/>
      </VictoryChart>
      <Button size='massive'color={this.state.buttonText === "Show Democrats" ? "blue" : "red"} onClick={this.flipParty}>{this.state.buttonText}</Button>
      </Container>

    )}

  noBusinesses = () => {
    return (
      <Container>
        <Segment padded basic/>
              <Message warning size="massive">
            <Message.Header as="h1"><Icon name="bar graph"/>Unable to display Analytics.</Message.Header>
            <p>To display Analytics, analyze more transactions to find businesses with campaign finance data.</p>
          </Message>
    </Container>)
  }




  render(){
    console.log(this.props.businesses);
    return (
      <React.Fragment>
        {this.props.businesses.length !== 0 ? this.hasBusinesses() : this.noBusinesses()}
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


export default connect(mapStateToProps, actions)(withAuth(Analytics))
