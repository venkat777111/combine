import React, { useState } from "react";
import "./scheduleMeet.css";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { schedule } from "../../actions/userAction";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TimerIcon from "@mui/icons-material/Timer";
import DescriptionIcon from "@mui/icons-material/Description";

const ScheduleMeet = ({ experts }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [desc, setDesc] = useState();
  const { room } = useParams();
  const { email } = experts.reduce((acc, mod) => {
    if (Number(room) === mod.room) {
      return mod;
    }
    return acc;
  }, {});

  const meetingInfo = (e) => {
    e.preventDefault();

    if (date.length === 0 || time.length === 0 || desc.length === 0) {
      alert.error("Input fields missing");
      return;
    }
    dispatch(schedule({ date, time, desc, email, room }));
    navigate("/");
  };
  return (
    <>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Schedule Your Meet</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={meetingInfo}
          >
            <div>
              <DateRangeIcon />
              <input
                type="date"
                placeholder="Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <TimerIcon />
              <input
                type="time"
                placeholder="Time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <input
                type="text"
                placeholder="Description"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <input type="submit" className="shippingBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ScheduleMeet;
