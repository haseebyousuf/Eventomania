import moment from "moment";
import isEmail from "validator/lib/isEmail";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
  password: yup.string().required("Password is required."),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is Required"),
  newPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol")
    .notOneOf(
      [yup.ref("currentPassword"), null],
      "Old Password and New Password Cannot Be Same"
    ),
  cNewPassword: yup
    .string()
    .required("Confirm Password Please")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

// Custom validation method for ensuring the end date is after the start date
const isEndDateAfterStartDate = (endDate, options) => {
  const { startDate } = options.parent;
  return moment(new Date(startDate)).isBefore(new Date(endDate));
};
const isNotPast = (value) => {
  return moment(value).isSameOrAfter(moment(), "day");
};

export const eventSchema = yup.object().shape({
  name: yup.string().required("*Name Required!"),
  startDate: yup
    .date()
    .required("Start Date is required")
    .typeError("Invalid Date and Time!")
    .test("is-not-past", "Start Date should not be in the past", isNotPast),
  endDate: yup
    .date()
    .required("End Date and Time is required")
    .typeError("Invalid Date and Time!")
    .test("is-not-past", "End Date should not be in the past", isNotPast)
    .test(
      "is-after-start-date",
      "End Date should not be same or before Start Date",
      isEndDateAfterStartDate
    ),
  venue: yup.string().required("*Venue is Required!"),
  description: yup.string().required("*Description is Required"),
  banner: yup.string().required("*banner required"),
  order: yup.string().required("*order file required"),
});

export const committeeMemberSchema = yup.object().shape({
  memberName: yup.string().required("*Name Required"),
  memberPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol"),
  memberEmail: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
  mobile: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
});

export const memberSchema = yup.object().shape({
  memberName: yup.string().required("*Name Required"),
  memberPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol"),
  memberEmail: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
  committee: yup.string().required("Committee is required!").ensure(),
  mobile: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
});

export const convenorSchema = yup.object().shape({
  name: yup.string().required("*Name Required"),
  password: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol"),
  email: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
  committee: yup.string().required("Committee is required!").ensure(),
  mobile: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    ),
});

export const committeeSchema = yup.object().shape({
  name: yup.string().required("*Name is Required"),
  description: yup.string().required("Description is required"),
});

export const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  regNo: yup.string().required("Registration Number is required"),
  courseSemesterDept: yup
    .string()
    .matches(new RegExp(/^.+-.+-.+$/), "Please use Hyphens (-)")
    .required("Required Field"),
  mobileNo: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
  email: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
});

export const facultySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  employeeId: yup.string().required("Employee ID is required"),
  department: yup.string().required("Department is required"),
  mobileNo: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
  email: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `That doesn't look like an ${message.path}`,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
});

export const reportSchema = yup.object().shape({
  report: yup.string().required("*report required"),
});

export const photosSchema = yup.object().shape({
  photos: yup
    .array()
    .required("*photos required")
    .max(5, "You can upload up to 5 photos."),
});
