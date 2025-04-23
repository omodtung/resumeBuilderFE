import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton, SortButton, SearchInput, TextInput } from 'react-admin';

const userFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="username" defaultValue="" />,
    <TextInput source="email" defaultValue="" />,
    <TextInput source="phone" defaultValue="" />,
    <TextInput source="role" defaultValue="" />,
];

export const UserList = () => (
    <List filters={userFilters}>
        <Datagrid rowClick={false}>
            <TextField source="id" sortable />
            <TextField source="username" sortable />
            <TextField source="role" sortable />
            <EmailField source="email" sortable />
            <TextField source="phone" sortable />
            <DateField source="created_at" sortable />
            <TextField source="user_subscription_id" sortable />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
