import { List, Datagrid, TextField, EmailField, DateField, BooleanField, EditButton, DeleteButton, SearchInput, TextInput } from 'react-admin';

const resumeFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="" />,
    <TextInput source="firstName" defaultValue="" />,
    <TextInput source="lastName" defaultValue="" />,
    <TextInput source="jobTitle" defaultValue="" />,
    <TextInput source="city" defaultValue="" />,
    <TextInput source="country" defaultValue="" />,
    <TextInput source="email" defaultValue="" />,
];

export const ResumeList = () => (
    <List filters={resumeFilters}>
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
            {/* <BooleanField source="enabled" /> */}
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
