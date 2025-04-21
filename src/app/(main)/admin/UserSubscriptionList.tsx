import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';

const UserSubscriptionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="stripeCustomerId" />
            <TextField source="stripeSubscriptionId" />
            <DateField source="stripeCurrentPeriodEnd" />
            <BooleanField source="stripeCancelAtPeriodEnd" />
        </Datagrid>
    </List>
);

export default UserSubscriptionList;
