
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useButton } from "../Context/SelectButtonContext";
import "./DateReservation.css";

const DateReservation = ({ place }) => {
  const { selectedButton } = useButton();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wenesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getDate = () => {
    const month = monthNames[selectedButton.day.getMonth()];
    const day = selectedButton.day.getDate();
    const weekDay = dayNames[selectedButton.day.getDay()];
    const formatedDate = `${weekDay}, ${month} ${day}`;
    return formatedDate;
  };

  return (
    <div className="dateReserv-container">
      <div className="dateReserv-title">
        <h3>LITTLE LEMON</h3>
      </div>
      <div className="dataReserv-container">
      <div className="dataReserv date">
        <FontAwesomeIcon icon={faCalendar} />
        <p>{getDate()}</p>
      </div>
      <div className="dataReserv hour">
        <FontAwesomeIcon icon={faClock} />
        <p>{selectedButton.hour}</p>
      </div>
      <div className="dataReserv people">
        <FontAwesomeIcon icon={faUser} />
        <p>{`${selectedButton.people} (${place})`}</p>
      </div>
    </div>
    </div>
  );
};

export default DateReservation;
