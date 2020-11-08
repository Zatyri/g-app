import React from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";

const SubscriptMain = () => {
  return (
    <Segment placeholder>
      <Grid columns={2} stackable>
        <Divider vertical ></Divider>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column textAlign='right'>
            test
          </Grid.Column>         
          <Grid.Column textAlign='left'>
            moi
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
};

export default SubscriptMain;
