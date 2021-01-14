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

const addressFormSchema = yup.object().shape({
    line1: yup.string().required().label("Line 1"),
    line2: yup.string().optional().label("Line 2"),
    zipcode: yup.string().required().label("Zipcode"),
    city: yup.string().required().label("City"),
    state: yup.string().required().label("State"),
    //country: yup.string().required().label("Country"),
});

const openingHoursFormSchema = yup.object().shape({

});

export default {
    locationBasicFormSchema,
    productCategoryFormSchema,
    addressFormSchema,
    openingHoursFormSchema,
}