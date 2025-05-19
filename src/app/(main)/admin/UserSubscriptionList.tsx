import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';

const UserSubscriptionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="stripeCustomerId" />
            <TextField source="stripeSubscriptionId" />
            <TextField source="stripePriceId" />
            <TextField source="user_id" />
            <DateField source="createdAt" label="Created At" />
            <DateField source="updatedAt" label="Updated At" />
            <DateField source="stripeCurrentPeriodEnd" label="Current Period End" />
            <BooleanField source="stripeCancelAtPeriodEnd" label="Cancel At Period End" />
            <BooleanField source="isActive" label="Active" />
        </Datagrid>
    </List>
);

export default UserSubscriptionList;
