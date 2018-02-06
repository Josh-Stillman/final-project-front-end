import React from 'react'
import { Table, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'

class HomePage extends React.Component {

  //formatting from other pages.




  getNums = () => {

    let myNums = {
      yourRepSpending: "",
      yourDemSpending: "",
      totalRepSpending: "",
      totalDemSpending: ""
    }
    if (this.props.businesses != []) {
      let myOrgs = {
        repOrgs: this.props.businesses.filter(biz => biz.total_rep_pct > .5),
        demOrgs: this.props.businesses.filter(biz => biz.total_dem_pct > .5),
      }


      myNums = {
        yourRepSpending: helpers.floatFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        yourDemSpending: helpers.floatFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        totalRepSpending: helpers.intFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseInt(biz.total_rep), 0)),
        totalDemSpending: helpers.intFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseInt(biz.total_dem), 0))
      }

    }
    return myNums
  }



//   const getNumbers = () =>{
//     myOrgs.repOrgs = props.businesses.filter(biz => biz.total_rep_pct > .5)
//     nums.demOrgs = props.businesses.filter(biz => biz.total_dem_pct > .5)
//     let yourRepSpending = repOrgs.reduce((acc, biz) => acc += biz.user_total_spending)
// user_total_spending
//
// total_dem
//   }

render(){

  let myNums = this.getNums()
  return (
    <React.Fragment >
    <Header as='h1'>
      <Header.Content>
        Follow <i>Your</i> <Icon name='dollar' />
      </Header.Content>
    </Header>
    <Header as='h2'>
      <Icon name='dollar' />
      <Header.Content>
        You have spent {myNums.yourRepSpending} at businesses that lean Republican.  Those businesses have donated {myNums.totalRepSpending} to Republican interests in the 2016-2018 cycles so far.
      </Header.Content>
    </Header>
    <br/>
    <Header as='h2'>
      <Icon name='dollar' />
      <Header.Content>
        You have spent {myNums.yourDemSpending} at businesses that lean Democrat.  Those businesses have donated {myNums.totalDemSpending} to Democrat interests in the 2016-2018 cycles so far.
      </Header.Content>
    </Header>

    </React.Fragment>
  )
}

}

const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
    column: state.businesses.column,
    direction: state.businesses.direction

  }
}


export default connect(mapStateToProps, actions)(HomePage)
