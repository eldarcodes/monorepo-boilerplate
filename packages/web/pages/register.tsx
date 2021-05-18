import { Field, Formik } from "formik";
import { Button, Form } from "semantic-ui-react";
import withApollo from "./../lib/withApollo";
import { InputField } from "./../components/formik-fields/input";
import { registerSchema } from "@codesy/common";
import { useRegisterMutation } from "../generated/graphql";
import { normalizeErrors } from "../utils/normalizeErrors";

interface RegisterProps {}

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();
  const submit = async (values: FormValues) => {};

  return (
    <Formik<FormValues>
      initialValues={{ username: "", email: "", password: "" } as FormValues}
      onSubmit={async (input, { setErrors, setSubmitting }) => {
        const response = await register({ variables: { input } });

        if (response.data?.register.errors) {
          setSubmitting(false);
          setErrors(normalizeErrors(response.data?.register.errors));
        } else {
        }
      }}
      validationSchema={registerSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            label="Username"
            placeholder="Username"
            name="username"
            component={InputField}
          />
          <Field
            label="email"
            placeholder="E-mail"
            name="email"
            component={InputField}
          />
          <Field
            label="Password"
            placeholder="Password"
            name="password"
            component={InputField}
            type="password"
          />

          <Button type="submit" primary>
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Register);
