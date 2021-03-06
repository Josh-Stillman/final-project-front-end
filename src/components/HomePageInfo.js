import React from 'react'
import { Flag, Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'

const HomePageInfo = (props) => {


  return (
    <Segment vertical padded="very" size="large">
      <Header as="h1" textAlign="center" style={{fontSize: 30, fontFamily: "Inconsolata, monospace"}}>
        Uncover the political spending of the businesses you shop at
      </Header>
      <br/>
      <Container textAlign="center">
       <Icon color="grey" name='user outline' size="massive"/>
       <Icon color="grey" name='arrow right' size="huge"/>
        <Icon color="grey" name='credit card alternative' size="massive"/>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Icon color="grey" name='arrow right' size="huge"/>
        <Icon color="grey" name='building outline' size="massive"/>
        <Icon color="grey" name='arrow right' size="huge"/>
        <Icon color="grey" name='dollar' size="massive"/>
        <Icon color="grey" name='arrow right' size="huge"/>
        <Icon color="grey" name='flag' size="massive" />
      </Container>
    </Segment>
  )

}

export default HomePageInfo
