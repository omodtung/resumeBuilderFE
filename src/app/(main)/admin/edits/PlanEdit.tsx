import { Edit, SimpleForm, TextInput } from 'react-admin';

const PlanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="stripePriceId" />
      <TextInput source="plansName" />
      <TextInput source="price" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

export default PlanEdit;
