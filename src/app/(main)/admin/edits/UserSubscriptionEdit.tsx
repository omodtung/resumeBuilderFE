import { Edit, SimpleForm, TextInput, BooleanInput, DateInput } from 'react-admin';

const UserSubscriptionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="stripeCustomerId" />
            <TextInput source="stripeSubscriptionId" />
            <TextInput source="stripePriceId" />
            <TextInput source="user_id" />
            <DateInput source="createdAt" disabled label="Created At" />
            <DateInput source="updatedAt" disabled label="Updated At" />
            <DateInput source="stripeCurrentPeriodEnd" label="Current Period End" />
            <BooleanInput source="stripeCancelAtPeriodEnd" label="Cancel At Period End" />
            <BooleanInput source="isActive" label="Active" />
        </SimpleForm>
    </Edit>
);

export default UserSubscriptionEdit;
