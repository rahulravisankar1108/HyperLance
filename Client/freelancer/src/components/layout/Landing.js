import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Freelancer Portal</b>{" "}
            </h4>
            <p className="flow-text grey-text text-darken-1">
             Get hired and get the job done!
            </p>
            <div>
              <a
                href="https://github.com/vishalnagda1/mern-jwt-auth"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </div>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;

// import React, { useState } from "react";
// const Landing = () => {
//   const [formData, setFormData] = useState({
//     from: "",
//     to: "",
//     date: "",
//   });
//   const { from, to, date } = formData;
//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Success");
//   };
//   return (
//     <section className="landing">
//       <div className="dark-overlay">
//         <div className="landing-inner">
//           <h1 className="large">Welcome to Atlantic Travels</h1>
//           <form className="form" onSubmit={(e) => onSubmit(e)}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Enter City"
//                 name="from"
//                 value={from}
//                 onChange={(e) => onChange(e)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Enter City"
//                 name="password"
//                 value={to}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="Date"
//                 placeholder="Selct the date"
//                 name="date"
//                 value={date}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>
//             <input type="submit" className="btn btn-primary" value="Search" />
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Landing;