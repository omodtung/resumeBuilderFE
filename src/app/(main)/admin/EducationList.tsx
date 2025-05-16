import { List, Datagrid, TextField, DateField, SearchInput, TextInput, Filter } from 'react-admin';

const EducationFilter = () => (
    <Filter>
        <SearchInput source="q" alwaysOn />
        <TextInput source="degree" defaultValue="" />
        <TextInput source="school" defaultValue="" />
        <TextInput source="resume_id" defaultValue="" />
    </Filter>
);

export const EducationList = () => (
    <List filters={[<EducationFilter />]}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="created_at" />
            <TextField source="degree" />
            <DateField source="end_date" />
            <TextField source="school" />
            <DateField source="start_date" />
            <TextField source="updated_at" />
            <TextField source="resume_id" />
        </Datagrid>
    </List>
);
