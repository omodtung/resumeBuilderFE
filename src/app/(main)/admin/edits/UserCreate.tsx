import { Create, SimpleForm, TextInput } from 'react-admin';

const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="role" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
