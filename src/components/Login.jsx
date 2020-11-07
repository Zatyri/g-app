import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import {
  Form,
  Button,
  Icon,
  Segment,
  Grid,  
  Header,
  Label
} from "semantic-ui-react";

const validationSchema = Yup.object().shape({
  username: Yup.string()
  .min(4, 'Käyttäjänimi liian lyhyt')
  .max(15, 'Käyttäjänimi liian pitkä')
  .required('Käyttäjänimi puuttuu'),
  password: Yup.string()
  .min(8, 'Salasana liian lyhyt')
  .required('Salasana puuttuu')
})

const Login = () => {
  return (
    <Segment placeholder>
      <Grid columns={1} relaxed="very" stackable>
        <Grid.Column>
          <div className="form">
            <Header as="h1">Login</Header>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>                  
                    <Form.Input
                      type="text"
                      onChange={props.handleChange}
                      value={props.values.username}
                      name="username"
                      icon="user"
                      iconPosition="left"
                      label="Käyttäjänimi"
                      placeholder="käyttäjänimi"
                    />
                    {props.errors.username && <Label pointing color='yellow'>{props.errors.username}</Label>}
                  
                  <Form.Input
                    type="password"
                    onChange={props.handleChange}
                    value={props.values.password}
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    label="Salasana"
                    placeholder="salasana"
                  />
                  {props.errors.password && <Label pointing color='yellow'>{props.errors.password}</Label>}
                  <Button
                    animated
                    type="submit"
                    disabled={props.isSubmitting}
                    color="green"
                  >
                    <Button.Content visible>Kirjaudu</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Grid.Column>
        
      </Grid>
      
    </Segment>
  );
};

export default Login;
