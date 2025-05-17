import { List, Datagrid, TextField, EmailField, DateField, Filter } from 'react-admin';

const JobFilter = (props: any) => (
    <Filter {...props}>
    </Filter>
);

export const JobList = (props: any) => (
    <List filters={<JobFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="company" />
            <TextField source="job_id" />
            <DateField source="created_at" />
            <EmailField source="email" />
            <TextField source="status" />
        </Datagrid>
    </List>
);
