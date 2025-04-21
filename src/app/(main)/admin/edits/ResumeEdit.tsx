import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

const ResumeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="jobTitle" />
            <TextInput source="city" />
            <TextInput source="country" />
            <TextInput source="phone" />
            <TextInput source="email" />
            <BooleanInput source="enabled" />
        </SimpleForm>
    </Edit>
);

export default ResumeEdit;
