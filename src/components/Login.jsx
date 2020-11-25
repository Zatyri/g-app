import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/user';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form,
  Button,
  Icon,
  Segment,
  Grid,
  Header,
  Label,
} from 'semantic-ui-react';
import { setCookie } from './utils/cookies';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Käyttäjänimi liian lyhyt')
    .max(15, 'Käyttäjänimi liian pitkä')
    .required('Käyttäjänimi puuttuu'),
  password: Yup.string()
    .min(8, 'Salasana liian lyhyt')
    .required('Salasana puuttuu'),
});

const Login = ({ setToken }) => {
  const [login] = useMutation(LOGIN);
  const [invalidAuth, setInvalidAuth] = useState(false);

  const signUserIn = async ({ username, password }) => {
    try {
      const { data } = await login({
        variables: { username: username, password: password },
      });
      setToken(data.login.value);
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('g-app-user-token', data.login.value);
      }
      if(process.env.NODE_ENV === 'production') {        
        setCookie('g-app-user-token', data.login.value, 1)
      }
      
      setInvalidAuth(false);
    } catch (error) {
      setInvalidAuth(true);
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={1} relaxed="very" stackable>
        <Grid.Column>
          <div className="form">
            <Header as="h1">Kirjaudu</Header>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                signUserIn(values);
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
                  {props.errors.username && (
                    <Label className="errorMessage" pointing color="yellow">
                      {props.errors.username}
                    </Label>
                  )}
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
                  {props.errors.password && (
                    <Label className="errorMessage" pointing color="yellow">
                      {props.errors.password}
                    </Label>
                  )}
                  <Button
                    animated
                    type="submit"
                    disabled={props.isSubmitting}
                    color="green"
                    style={{ margin: '4px' }}
                  >
                    <Button.Content visible>Kirjaudu</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                  {invalidAuth && (
                    <Label color="red">Väärä käyttäjänimi tai salasana</Label>
                  )}
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
