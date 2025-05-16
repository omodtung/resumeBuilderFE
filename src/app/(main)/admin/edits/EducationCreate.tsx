import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

const EducationCreate = () => (
    <Create>
        <SimpleForm>
            <DateInput source="created_at" />
            <TextInput source="degree" />
            <DateInput source="end_date" />
            <TextInput source="school" />
            <DateInput source="start_date" />
            <DateInput source="updated_at" />
            <TextInput source="resume_id" />
        </SimpleForm>
    </Create>
);

export default EducationCreate;
