import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, SearchInput, TextInput } from 'react-admin';

const planFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="stripePriceId" defaultValue="" />,
    <TextInput source="plansName" defaultValue="" />,
    <TextInput source="price" defaultValue="" />,
    <TextInput source="description" defaultValue="" />,
];


export const PlanList = () => (
    <List filters={planFilters}>
        <Datagrid rowClick={false}>
            <TextField source="id" />
            <TextField source="stripePriceId" />
            <TextField source="plansName" />
            <TextField source="price" />
            <TextField source="description" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <DateField source="deletedAt" />
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export default PlanList;
