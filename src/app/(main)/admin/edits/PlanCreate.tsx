import { SimpleForm, TextInput } from 'react-admin';

const PlanCreate = () => {
  return (
    <SimpleForm>
      <TextInput source="stripePriceId" label="Stripe Price ID" />
      <TextInput source="plansName" label="Plan Name" />
      <TextInput source="price" label="Price" />
      <TextInput source="description" label="Description" />
    </SimpleForm>
  );
};

export default PlanCreate;
