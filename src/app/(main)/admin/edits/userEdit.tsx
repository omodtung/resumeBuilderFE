import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="role" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
