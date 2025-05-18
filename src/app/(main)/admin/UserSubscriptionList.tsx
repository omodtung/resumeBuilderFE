import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';

const UserSubscriptionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="stripeCustomerId" />
            <TextField source="stripeSubscriptionId" />
            <TextField source="stripePriceId" />
            <TextField source="user_id" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <DateField source="stripeCurrentPeriodEnd" />
            <BooleanField source="stripeCancelAtPeriodEnd" />
            <BooleanField source="isActive" />
        </Datagrid>
    </List>
);

export default UserSubscriptionList;
