import { List, Datagrid, TextField, EmailField, DateField, BooleanField, EditButton, DeleteButton } from 'react-admin';
import { useParams } from 'react-router-dom';

export const UserResumesList = () => {
    const { userId } = useParams();

    // TODO: Implement data fetching for /admin/users/resumes/{userId}

    return (
        <List resource={`users/resumes/${userId}`} title={`Resumes for User ${userId}`}>
            <Datagrid rowClick={false}>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="jobTitle" />
                <TextField source="city" />
                <TextField source="country" />
                <TextField source="phone" />
                <EmailField source="email" />
                {/* <BooleanField source="enabled" /> */}
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};
