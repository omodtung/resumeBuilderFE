import { List, Datagrid, TextField, EmailField, DateField, Show, TabbedShowLayout, Tab, SimpleShowLayout } from 'react-admin';
import { SearchInput, TextInput } from 'react-admin';

const userFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="username" defaultValue="" />,
    <TextInput source="email" defaultValue="" />,
    <TextInput source="phone" defaultValue="" />,
    <TextInput source="role" defaultValue="" />,
];

export const UserList = () => (
    <List filters={userFilters}>
        <Datagrid rowClick="show">
            <TextField source="id" sortable />
            <TextField source="username" sortable />
            <TextField source="role" sortable />
            <EmailField source="email" sortable />
            <TextField source="phone" sortable />
            <DateField source="created_at" sortable />
            <TextField source="user_subscription_id" sortable />
        </Datagrid>
    </List>
);

export const UserShow = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="User">
                <TextField source="id" />
                <TextField source="username" />
                <TextField source="role" />
                <EmailField source="email" />
                <TextField source="phone" />
                <DateField source="created_at" />
            </Tab>
            <Tab label="User Subscription">
                <TextField source="user_subscription.id" />
                <DateField source="user_subscription.created_at" />
                <DateField source="user_subscription.updated_at" />
                <DateField source="user_subscription.stripe_cancel_at_period_end" />
                <DateField source="user_subscription.stripe_current_period_end" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);
