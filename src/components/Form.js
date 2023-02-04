import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser} from "../features/usersSlice";

const Form = () => {
  const [hobbys, setHobbys] = useState([]);

  const [data, setData] = useState({
    fName: "",
    lName: "",
    semester: "",
    gender: "",
  });

  const handleHobby = (e) => {
    const { value, checked } = e.target;
    // console.log(e.target.id);
    if (checked) {
      setHobbys([...hobbys, value]);
    } else {
      setHobbys(hobbys.filter((elem) => elem !== value));
    }
  };

  const resetForm = () => {
    setData({
      fName: "",
      lName: "",
      semester: "",
      gender:""
    })
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.users);
  // console.log(stateData);

  const fullDetails = {
    ...data,
    hobby: [...hobbys],
  };
  const submitData = ()=>{
    if(data.fName){
      dispatch(addUser(fullDetails),
        setData({
          fName: "",
          lName: "",
          semester: "",
          gender:""
        })
      )}else{
        alert("please enter first name")
      }
    }
    
  

  return (
    <div className="form">
      <div className="form-input">
        <div className="fName">
          <label htmlFor="fName">First Name:</label>
          <input
            type="text"
            id="fName"
            required
            name="fName"
            value={data.fName}
            placeholder="Enter your first name"
            onChange={changeHandler}
          />
        </div>
        <div className="lName">
          <label htmlFor="lName">Last Name:</label>
          <input
            type="text"
            id="lName"
            name="lName"
            value={data.lName}
            placeholder="Enter your last name"
            onChange={changeHandler}
          />
        </div>
        <div className="radio">
         <span style={{fontSize:"1rem", fontWeight:"500"}}>Gender:</span> 
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            onChange={changeHandler}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={changeHandler}
          />
          <label htmlFor="female">Female</label>
        </div>

        <div className="semester">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            name="semester"
            id="semester"
            value={data.semester}
            onChange={changeHandler}
          />
        </div>

        <div className="hobby">
          <span style={{fontSize:"1rem",fontWeight:"500" }}> Hobby:</span>
          <input
            type="checkbox"
            value="cricket"
            name="hobby"
            id="cricket"
            onChange={handleHobby}
          />
          <label htmlFor="cricket">cricket</label>
          <input
            type="checkbox"
            value="coding"
            name="hobby"
            id="coding"
            onChange={handleHobby}
          />
          <label htmlFor="coding">Coding</label>
          <input
            type="checkbox"
            value="travelling"
            name="hobby"
            id="travelling"
            onChange={handleHobby}
          />
          <label htmlFor="travelling">Travelling</label>
        </div>
        <div className="btn">
          <button
            onClick={() =>
              submitData()
            }
          >
            Enter
          </button>
          <button type="reset" onClick={resetForm}>
            Cancle
          </button>
        </div>
      </div>
      <div className="userlist">
     { (stateData.length > 0 ? 
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Semester</th>
              <th>Hobbys</th>
            </tr>
          </thead>
          <tbody>
            {stateData.map((user, indx) => {
              return (
                <tr key={indx}>
                  <td>{indx + 1}.</td>
                  <td>{`${user.fName} ${user.lName}`}</td>
                  <td>{user.gender}</td>
                  <td>{user.semester}</td>
                  <td>{user.hobby.map((hobby) => `${hobby} `)}</td>
                  <td>
                    <button onClick={() => dispatch(removeUser(indx))}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        : null )}
      </div>
    </div>
  );
};

export default Form;
