import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, BooleanField, FunctionField } from 'react-admin';
import { useParams } from 'react-router-dom';

export const UserSubscriptionListByUser = () => {
    const { userId } = useParams();

    return (
        <List resource={`user/user-subscription-follow-userId/${userId}`} title={`Subscriptions for User ${userId}`}>
            <Datagrid rowClick={false}>
                <TextField source="id" />
                <TextField source="stripeCustomerId" />
                <TextField source="stripeSubscriptionId" />
                <BooleanField source="stripeCancelAtPeriodEnd" label="Cancel At Period End" />
                <FunctionField
                    label="Current Period End"
                    render={record => {
                        if (!record.stripeCurrentPeriodEnd) return null;
                        const date = new Date(record.stripeCurrentPeriodEnd);
                        return date.toLocaleDateString();
                    }}
                />
                <TextField source="user.username" label="Username" />
                <TextField source="plan.plansName" label="Plan Name" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};
