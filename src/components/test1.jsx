import { useState, useEffect } from "react";
import { useGetAllPostQuery, useGetUserByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from "../services/postDataUsingGql";
import "../App.css";

const Test1 = () => {
  const [userData, setUserData] = useState([]);
  const { data, error, isLoading, refetch } = useGetAllPostQuery();



  const [createUserData] = useCreatePostMutation();

  const fetchAllData = async (data) => {
    try {
      const allData = await data.data.users;
      setUserData(allData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllData(data);

  }, [data]);

  ///add new users
  const [createUser, setCreateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  }
  // const createPost = {
  //   firstName: "Ram",
  //   lastName: "Dai",
  //   email: "hemudai123@gmail.com",
  // };
  const createPost = createUser;

  const handleAdd = async () => {
    try {
      const reponse = await createUserData(createPost);
      const updateData = reponse.data.data.userAdd;
      setUserData([...userData, updateData]);
      setCreateUser({
        firstName: "",
        lastName: "",
        email: ""
      })
    } catch (error) {
      console.log(error);
    }
  };

  //delete specific user

  const [deleteUser] = useDeletePostMutation();
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }


  }

  //edit get all data by id
  const [getId, setGetId] = useState("");
  const { data: userDataById, error: userDataError, isLoading: isUserDataLoading } = useGetUserByIdQuery(getId);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (id) => {
    setGetId(id);
  }

  useEffect(() => {
    if (userDataById && userDataById.data.user) {
      const newData = userDataById.data.user;
      setCreateUser({
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email
      });
      setIsEdit(true);
    }
  }, [userDataById]);
  //update the data after get all data by id
  const [updateData, responseData] = useUpdatePostMutation();


  // const handleUpdate = async () => {
  //   try {
  //     const data = await updateData({
  //       id: getId,
  //       updatedUser: createUser,
  //     });

  //     const newData = responseData.data.data.userUpdate;
  //     setUserData((prevData) => [...prevData, newData]);


  //     console.log(newData, "Updated user data");
  //     // setUserData([...userData,createUser]);
  //     // setCreateUser({
  //     //   firstName: "",
  //     //   lastName: "",
  //     //   email: "",
  //     // });
  //     // setIsEdit(false);
  //     // setGetId(""); 
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const response = await updateData({
        id: getId,
        updatedUser: createUser,
      });

      const updatedUser = response.data.data.userUpdate;

      setUserData((prevData) =>
        prevData.map((data) => (data.id === updatedUser.id ? updatedUser : data))
      );
      setCreateUser({
        firstName: "",
        lastName: "",
        email: "",
      });
      setIsEdit(false);
      setGetId("");

      console.log(updatedUser, "Updated user data");
    } catch (error) {
      console.error(error);
    }
  };









  return (
    <>
      <br />
      <div className="inputField">
        <input type="text" placeholder="enter first name ..." name="firstName" onChange={handleInputs} value={createUser.firstName} />
        <input type="text" placeholder="enter last name ..." name="lastName" onChange={handleInputs} value={createUser.lastName} />
        <input type="email" placeholder="enter email ..." name="email" onChange={handleInputs} value={createUser.email} />
        {!isEdit ? <button onClick={handleAdd}>Add +</button> : <button onClick={handleUpdate}>Update +</button>}
      </div>

      <br />
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((eachData, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{eachData.firstName}</td>
                <td>{eachData.lastName}</td>
                <td>{eachData.email}</td>
                <td>
                  <button onClick={() => { handleEdit(eachData.id) }}>Edit</button>
                  <button onClick={() => { handleDelete(eachData.id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Test1;
