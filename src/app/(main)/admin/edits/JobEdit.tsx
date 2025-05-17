import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin';

const JobEdit = (props: any) => (
    <Edit title="Job Edit" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="company" />
            <TextInput source="job_id" />
            <DateInput source="created_at" />
            <TextInput source="email" />
            <TextInput source="status" />
        </SimpleForm>
    </Edit>
);

export default JobEdit;
