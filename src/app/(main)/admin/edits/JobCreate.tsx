import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

const JobCreate = (props: any) => (
    <Create title="Job Create" {...props}>
        <SimpleForm>
            <TextInput source="company" />
            <TextInput source="job_id" />
            <DateInput source="created_at" />
            <TextInput source="email" />
            <TextInput source="status" />
        </SimpleForm>
    </Create>
);

export default JobCreate;
