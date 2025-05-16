import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

const WorkExperienceCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="company" />
            <DateInput source="created_at" />
            <TextInput source="description" />
            <DateInput source="end_date" />
            <TextInput source="position" />
            <DateInput source="start_date" />
            <DateInput source="updated_at" />
            <TextInput source="resume_id" />
        </SimpleForm>
    </Create>
);

export default WorkExperienceCreate;
