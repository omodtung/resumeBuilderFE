import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';

export const PlanList = () => (
    <List>
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
