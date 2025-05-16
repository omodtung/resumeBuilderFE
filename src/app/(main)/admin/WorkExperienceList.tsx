import { List, Datagrid, TextField, DateField, SearchInput, TextInput, Filter } from 'react-admin';

const WorkExperienceFilter = () => (
    <Filter>
        <SearchInput source="q" alwaysOn />
        <TextInput source="company" defaultValue="" />
        <TextInput source="position" defaultValue="" />
        <TextInput source="description" defaultValue="" />
        <TextInput source="resume_id" defaultValue="" />
    </Filter>
);

export const WorkExperienceList = () => (
    <List filters={[<WorkExperienceFilter />]}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="company" />
            <DateField source="created_at" />
            <TextField source="description" />
            <DateField source="end_date" />
            <TextField source="position" />
            <DateField source="start_date" />
            <DateField source="updated_at" />
            <TextField source="resume_id" />
        </Datagrid>
    </List>
);
