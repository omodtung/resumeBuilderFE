import { List, Datagrid, TextField, EmailField, DateField, BooleanField, EditButton, DeleteButton } from 'react-admin';

export const ResumeList = () => (
    <List>
        <Datagrid rowClick={false}>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="jobTitle" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField source="phone" />
            <EmailField source="email" />
            <BooleanField source="enabled" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
