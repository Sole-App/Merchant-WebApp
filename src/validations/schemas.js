import * as yup from "yup";

const locationBasicFormSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    description: yup.string().optional(),
    email: yup.string().email().optional(),
    phone_number: yup.string().optional(),
    latitude: yup.string().optional(),
    longitude: yup.string().optional(),
});

const productCategoryFormSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    category: yup.string().optional(),
});

export default {
    locationBasicFormSchema,
    productCategoryFormSchema,
}