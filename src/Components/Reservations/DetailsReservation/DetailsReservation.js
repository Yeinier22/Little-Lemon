import { useFormik } from "formik";
import * as Yup from "yup";
import "./detailsReservations.css";
import { useState, useContext, useEffect } from "react";
import DateReservation from "./DateReservation";
import FormTimer from "./timer";
import { useAlert } from "../Context/alertContext";
// import { submitAPI } from "../Ocuppancy"; // deprecated simulated API
import { createReservation } from "../../../api/reservations";
import { useButton } from "../Context/SelectButtonContext";
import { UserContext } from "../Reservations";

const FormSection = ({place, testing}) => {

  const {setIsOpen}=useAlert();
  const timer = FormTimer();
  
  const {setOccupation} = useContext(UserContext);
  const { selectedButton } = useButton();
  const selectHour=selectedButton.hour;
  const pickDate = selectedButton.day

  const people = selectedButton.people;
  const parts = people.split(" ");
  const people1 = parseInt(parts[0]);


  const formData={date: pickDate,
  hour: selectHour,
  place: place,
  people: people1
    }

  const handleFormSubmit = async () => {
    setIsOpen(true);
    timer.setTiempoRestante(0);
    timer.setFormularioCompletado(true);
    try {
      // We need user entered data too (formik values) but current form only uses name/last/email/phone not persisted before.
      // Combine into reservation creation call.
      await createReservation({
        name: formik.values.firstName + ' ' + formik.values.lastName,
        email: formik.values.email,
        people: people1,
        date: pickDate,
        time: selectHour,
        location: place
      });
      // add to local occupation state to reflect new booking visually (optional)
      setOccupation(prev => [...prev, formData]);
      console.log("Reservation stored in DB");
    } catch(err){
      console.error('Reservation error', err);
    }
  };

  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      occasion: "",
      specialRequest: "",
    },
    onSubmit: () => {
      handleFormSubmit();
      formik.resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a valid phone number")
        .required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      specialRequest: Yup.string().max(25, "Must be at most 25 characters"),
    }),
  });

const [selectedOption, setSelectedOption] = useState("");
const [timerFinished, setTimerFinished] = useState(false);

useEffect(() => {
  setTimerFinished(timer.minutos === 0 && timer.segundos === 0);
}, [timer.minutos, timer.segundos]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "none") {
      setSelectedOption("");
    } else {
      setSelectedOption(selectedValue);
    }
  };

  console.log(selectedOption);

  return (
    <div className="form-container">
      <div className="form-timer">
        <p>
          Due to limited availability, we can hold this table for you for {timer.formatMinutes()}:{timer.formatSeconds()} minutes
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formField-descriptionReserv">
          <div className="formField">
            <fieldset>
              <div className="Field">
                <input
                  id="first-name"
                  name="first-name"
                  placeholder="First name"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  disabled={timerFinished}
                  onBlur={formik.handleBlur} 
                />
                {formik.touched.firstName && formik.errors.firstName && !timerFinished && (
                  <p className="FieldError">{formik.errors.firstName}</p>
                )}
              </div>
              <div className="Field">
                <input
                  id="last-name"
                  name="last-name"
                  placeholder="Last name"
                  {...formik.getFieldProps("lastName")}
                  disabled={timerFinished}
                />
                {formik.touched.lastName && formik.errors.lastName && !timerFinished && (
                  <p className="FieldError">{formik.errors.lastName}</p>
                )}
              </div>
              <div className="Field">
                <input
                  id="phone-number"
                  name="phone-number"
                  placeholder="Phone number"
                  {...formik.getFieldProps("phoneNumber")}
                  disabled={timerFinished}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && !timerFinished &&(
                  <p className="FieldError">{formik.errors.phoneNumber}</p>
                )}
              </div>
              <div className="Field">
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                  disabled={timerFinished}
                />
                {formik.touched.email && formik.errors.email && !timerFinished && (
                  <p className="FieldError">{formik.errors.email}</p>
                )}
              </div>
              <div className="Field">
                <select
                  id="occasion"
                  name="occasion"
                  {...formik.getFieldProps("occasion")}
                  value={formik.values.occasion}
                  onChange={handleChange}
                  disabled={timer.minutos === 0 && timer.segundos === 0}
                >
                  <option className="Optional" value="" hidden>
                    Select an occasion (optional)
                  </option>
                  <option value="none">none</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="date">Date</option>
                  <option value="special occasion">Special Occasion</option>
                  <option value="bussines meal">Business Meal</option>
                </select>
              </div>
              <div className="Field">
                <input
                  id="special-request"
                  name="special-request"
                  placeholder="Add a special request (optional)"
                  {...formik.getFieldProps("specialRequest")}
                  disabled={timer.minutos === 0 && timer.segundos === 0}
                />
                <p>{formik.errors.specialRequest}</p>
              </div>
            </fieldset>
          </div> {testing ? null:
          <DateReservation place={place}/> }
        </div>
        <div className="form-submit">
          <button type="submit" value="Submit" disabled={!formik.dirty || !formik.isValid}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
