import { List, Datagrid, TextField, EmailField, DateField, BooleanField, EditButton, DeleteButton, SearchInput, TextInput, Filter, ImageField } from 'react-admin';
import { useLocation } from 'react-router-dom';

const ResumeFilter = () => {
    const location = useLocation();
    const userValuesIdsString = new URLSearchParams(location.search).get('userValuesIds');
    const userValuesIds = userValuesIdsString ? JSON.parse(userValuesIdsString) : [];

    return userValuesIds.length > 0 ? (
        <Filter>
            <TextInput source="userValuesIds" defaultValue={JSON.stringify(userValuesIds)} alwaysOn />
        </Filter>
    ) : null;
};

const resumeFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="" />,
    <TextInput source="firstName" defaultValue="" />,
    <TextInput source="lastName" defaultValue="" />,
    <TextInput source="jobTitle" defaultValue="" />,
    <TextInput source="city" defaultValue="" />,
    <TextInput source="country" defaultValue="" />,
    <TextInput source="email" defaultValue="" />,
];

const AvatarField = (props: any) => {
    if (!props.record.photo) {
        return null;
    }

    return (
        <ImageField
            {...props}
            source="photo"
            sx={{
                "& img": { maxWidth: "80px", maxHeight: "80px", objectFit: "cover" },
            }}
            transform={(value: string) => `http://localhost:8080/images/avatar/${value}`}
        />
    );
};

export const ResumeList = () => {
    const location = useLocation();
    const userValuesIdsString = new URLSearchParams(location.search).get('userValuesIds');
    const userValuesIds = userValuesIdsString ? JSON.parse(userValuesIdsString) : [];

    return (
        <List filters={userValuesIds.length > 0 ? [<ResumeFilter />] : resumeFilters}>
            <Datagrid rowClick={false}>
                <TextField source="id" />
                <AvatarField source="photo" label="Photo" />
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
