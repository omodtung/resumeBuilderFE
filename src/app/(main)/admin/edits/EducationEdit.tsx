import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin';

const EducationEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <DateInput source="created_at" />
            <TextInput source="degree" />
            <DateInput source="end_date" />
            <TextInput source="school" />
            <DateInput source="start_date" />
            <TextInput source="updated_at" />
            <TextInput source="resume_id" />
        </SimpleForm>
    </Edit>
);

export default EducationEdit;
