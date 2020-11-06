import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Icon,
  Segment,
  Grid,
  Divider,
  Header,
} from "semantic-ui-react";

const Login = () => {
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <div className='form'>     
            <Header as="h1">Login</Header>
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Käyttäjänimi puuttuu";
                } else if (values.username.length < 4) {
                  errors.username = "Käyttäjänimi liian lyhyt";
                }
                if (!values.password) {
                  errors.password = "Salasana puuttuu";
                } else if (values.password.length < 8) {
                  errors.password = "Salasana liian lyhyt";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="inputField">
                    <label htmlFor="username">Käyttäjänimi</label>
                    <Field name="username" placeholder="käyttäjänimi" />
                    {errors.username && touched.username ? (
                      <div>{errors.username}</div>
                    ) : null}
                  </div>
                  <div className="inputField">
                    <label htmlFor="password">Salasana</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="salasana"
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <Button
                      animated
                      type="submit"
                      disabled={isSubmitting}
                      color="green"
                    >
                      <Button.Content visible>Kirjaudu</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Grid.Column>
        <Grid.Column>test</Grid.Column>
      </Grid>
      <Divider vertical>-</Divider>
    </Segment>
  );
};

export default Login;
