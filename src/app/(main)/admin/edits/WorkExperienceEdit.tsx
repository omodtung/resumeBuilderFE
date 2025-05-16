import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin';

const WorkExperienceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="company" />
            <DateInput source="created_at" />
            <TextInput source="description" />
            <DateInput source="end_date" />
            <TextInput source="position" />
            <DateInput source="start_date" />
            <DateInput source="updated_at" />
            <TextInput source="resume_id" />
        </SimpleForm>
    </Edit>
);

export default WorkExperienceEdit;
