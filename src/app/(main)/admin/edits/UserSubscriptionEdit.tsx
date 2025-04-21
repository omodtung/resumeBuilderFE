import { Edit, SimpleForm, TextInput, BooleanInput, DateInput } from 'react-admin';

const UserSubscriptionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="stripeCustomerId" />
            <TextInput source="stripeSubscriptionId" />
            <DateInput source="stripeCurrentPeriodEnd" />
            <BooleanInput source="stripeCancelAtPeriodEnd" />
        </SimpleForm>
    </Edit>
);

export default UserSubscriptionEdit;
