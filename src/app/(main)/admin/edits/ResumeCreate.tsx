import { SimpleForm, TextInput } from 'react-admin';

const ResumeCreate = () => {
  return (
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="description" label="Description" />
      <TextInput source="firstName" label="First Name" />
      <TextInput source="lastName" label="Last Name" />
      <TextInput source="jobTitle" label="Job Title" />
      <TextInput source="city" label="City" />
      <TextInput source="country" label="Country" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  );
};

export default ResumeCreate;
