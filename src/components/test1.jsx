import { useState, useEffect } from "react";
import { useGetAllPostQuery, useGetUserByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from "../services/postDataUsingGql";
import "../App.css";
import { EuiButton, EuiFieldText, EuiFlexGroup,EuiFlexItem,EuiTable, EuiTableRow,EuiTableHeader,EuiTableHeaderCell,EuiTableBody,EuiTableRowCell } from '@elastic/eui';
import Flyout from "./flyout";


const Test1 = () => {
  const [userData, setUserData] = useState([]);

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const [isEdit, setIsEdit] =useState(false);

  //get all data
  const { data, error, isLoading, refetch } = useGetAllPostQuery();

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
  //edit button work 
  const [getId, setGetId] = useState("");
  const  handleEdit=(id)=>{
     setIsFlyoutVisible(true);
     setIsEdit(true);
     setGetId(id);

  }






  return (
    <>
      <br />
      <Flyout userData={userData} setUserData={setUserData} isFlyoutVisible={isFlyoutVisible} setIsFlyoutVisible={setIsFlyoutVisible} isEdit={isEdit} setIsEdit={setIsEdit} getId={getId} setGetId={setGetId}/>
 
      <br />
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <EuiTable >
        <EuiTableHeader>
            <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
            <EuiTableHeaderCell>First Name</EuiTableHeaderCell>
            <EuiTableHeaderCell>Last Name</EuiTableHeaderCell>
            <EuiTableHeaderCell>Email</EuiTableHeaderCell>
            <EuiTableHeaderCell>Action</EuiTableHeaderCell>
        </EuiTableHeader>

        <EuiTableBody >
            {userData.map((item, index) => (
                <EuiTableRow key={index} >
                    <EuiTableRowCell>{index + 1}</EuiTableRowCell>
                    <EuiTableRowCell>{item.firstName}</EuiTableRowCell>
                    <EuiTableRowCell>{item.lastName}</EuiTableRowCell>
                    <EuiTableRowCell>{item.email}</EuiTableRowCell>
                    <EuiTableRowCell>
                      <EuiButton fill size="s" color="primary" onClick={() => { handleEdit(item.id)}}>Edit</EuiButton>
                      <EuiButton fill size="s" color="danger" onClick={() => { handleDelete(item.id) }}>Delete</EuiButton>
                    </EuiTableRowCell>
                </EuiTableRow>
            ))}

         
        </EuiTableBody>   
        </EuiTable>     
           )
        }    

  </>
  )
};

export default Test1;
