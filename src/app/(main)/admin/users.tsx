import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick={false}>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
            <EmailField source="email" />
            <TextField source="phone" />
            <DateField source="created_at" />
            <TextField source="user_subscription_id" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
