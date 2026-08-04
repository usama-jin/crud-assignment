import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/userService";
import PageHeader from "./PageHeader";
import NoChangesModal from "./../components/models/NoChangesModal";
import SuccessModal from "./../components/models/SuccessModal";
import ErrorModal from "./../components/models/ErrorModal";
import axios from "axios";

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
const phoneRegex = /^\+[1-9]\d{7,14}$/;
const cityRegex = /^[A-Za-z\s.'-]+$/;

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
  });

  const [originalForm, setOriginalForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
  });

  // Modal Visibility & Content States
  const [showNoChangesModal, setShowNoChangesModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      try {
        const response = await getUser(Number(id));

        const userData = {
          firstName: response.data.firstName ?? "",
          lastName: response.data.lastName ?? "",
          email: response.data.email ?? "",
          phone: response.data.phone ?? "",
          address: response.data.address ?? "",
          city: response.data.city ?? "",
          province: response.data.province ?? "",
          country: response.data.country ?? "",
        };

        setForm(userData);
        setOriginalForm(userData);
      } catch {
        setErrorMessage("Failed to load user information.");
        setShowErrorModal(true);
      }
    };

    void loadUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for field as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    if (JSON.stringify(form) === JSON.stringify(originalForm)) {
      setShowNoChangesModal(true);
      return;
    }

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      country: "",
    };

    // First Name
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!nameRegex.test(form.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    } else if (form.firstName.length < 2) {
      newErrors.firstName = "Minimum 2 characters";
    } else if (form.firstName.length > 50) {
      newErrors.firstName = "Maximum 50 characters";
    }

    // Last Name
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(form.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    } else if (form.lastName.length < 2) {
      newErrors.lastName = "Minimum 2 characters";
    } else if (form.lastName.length > 50) {
      newErrors.lastName = "Maximum 50 characters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Invalid email address";
    } else if (form.email.length > 100) {
      newErrors.email = "Maximum 100 characters";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "Phone must start with + and contain 8–15 digits";
    } else if (form.phone.length < 9) {
      newErrors.phone = "Phone number is too short";
    } else if (form.phone.length > 20) {
      newErrors.phone = "Maximum 20 characters";
    }

    // Address
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (form.address.length < 10) {
      newErrors.address = "Minimum 10 characters";
    } else if (form.address.length > 100) {
      newErrors.address = "Maximum 100 characters";
    }

    // City
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    } else if (!cityRegex.test(form.city)) {
      newErrors.city =
        "Only letters, spaces, dots, hyphens, and apostrophes are allowed";
    } else if (form.city.length < 2) {
      newErrors.city = "Minimum 2 characters";
    } else if (form.city.length > 50) {
      newErrors.city = "Maximum 50 characters";
    }

    // Province
    if (!form.province.trim()) {
      newErrors.province = "Province is required";
    } else if (!nameRegex.test(form.province)) {
      newErrors.province = "Only letters are allowed";
    } else if (form.province.length < 2) {
      newErrors.province = "Minimum 2 characters";
    } else if (form.province.length > 50) {
      newErrors.province = "Maximum 50 characters";
    }

    // Country
    if (!form.country.trim()) {
      newErrors.country = "Country is required";
    } else if (!nameRegex.test(form.country)) {
      newErrors.country = "Only letters are allowed";
    } else if (form.country.length < 2) {
      newErrors.country = "Minimum 2 characters";
    } else if (form.country.length > 50) {
      newErrors.country = "Maximum 50 characters";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((val) => val !== "");
    if (hasErrors) return;

    // 3. API Update
    try {
      await updateUser(Number(id), form);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        console.error(error);
        setErrorMessage("An unexpected error occurred.");
        setShowErrorModal(true);
        return;
      }

      console.error(error);

      const responseData = error.response?.data;

      if (responseData?.errors) {
        const validationErrors = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          province: "",
          country: "",
        };

        if (Array.isArray(responseData.errors)) {
          responseData.errors.forEach((err: any) => {
            if (err.field in validationErrors) {
              validationErrors[err.field as keyof typeof validationErrors] =
                err.message;
            }
          });
        } else {
          Object.keys(responseData.errors).forEach((key) => {
            if (key in validationErrors) {
              const value = responseData.errors[key];

              validationErrors[key as keyof typeof validationErrors] =
                Array.isArray(value) ? value[0] : value;
            }
          });
        }

        setErrors(validationErrors);
        return;
      }

      setErrorMessage(responseData?.message || "Failed to update user");
      setShowErrorModal(true);
    }
  };
  return (
    <>
      <PageHeader
        title="Update"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Update-User" }]}
      />
      <div className="page-body">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Edit User</h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row">
                      {/* First Name */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label required">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label required">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className={`form-control ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label required">Email</label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                      </div>

                      {/* Phone */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label required">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          placeholder="+923001234567"
                          value={form.phone}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.phone}</div>
                      </div>

                      {/* Address */}
                      <div className="col-12 mb-3">
                        <label className="form-label required">Address</label>
                        <input
                          type="text"
                          name="address"
                          className={`form-control ${
                            errors.address ? "is-invalid" : ""
                          }`}
                          placeholder="Address"
                          value={form.address}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.address}</div>
                      </div>

                      {/* City */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label required">City</label>
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          placeholder="City"
                          value={form.city}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.city}</div>
                      </div>

                      {/* Province */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label required">Province</label>
                        <input
                          type="text"
                          name="province"
                          className={`form-control ${
                            errors.province ? "is-invalid" : ""
                          }`}
                          placeholder="Province"
                          value={form.province}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {errors.province}
                        </div>
                      </div>

                      {/* Country */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label required">Country</label>
                        <input
                          type="text"
                          name="country"
                          className={`form-control ${
                            errors.country ? "is-invalid" : ""
                          }`}
                          placeholder="Country"
                          value={form.country}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.country}</div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/users")}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-primary">
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NoChangesModal
        isOpen={showNoChangesModal}
        onClose={() => setShowNoChangesModal(false)}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        title="User Updated!"
        message="User details have been successfully saved."
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate("/users", { replace: true });
        }}
      />

      <ErrorModal
        isOpen={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </>
  );
}
