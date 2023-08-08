import React, { useState,useEffect } from 'react';
import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiButton,
    EuiText,
    EuiTitle,
    EuiFlyoutFooter,
    useGeneratedHtmlId,
    EuiFieldText, EuiFlexGroup,EuiFlexItem,EuiTable, EuiTableRow,EuiTableHeader,EuiTableHeaderCell,EuiTableBody,EuiTableRowCell 
} from '@elastic/eui';
import { useCreatePostMutation,useGetUserByIdQuery,useUpdatePostMutation } from '../services/postDataUsingGql';
export default function Flyout({userData,setUserData,isFlyoutVisible,setIsFlyoutVisible,isEdit,setIsEdit,getId,setGetId}) {
//add new users-----------------------------------------------
  const [createUserData] = useCreatePostMutation();
  const [createUser, setCreateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  }
//    const createPost = {
//     firstName: "Ram",
//     lastName: "Dai",
//     email: "hemudai123@gmail.com",
//   };
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
//add new user ends-----------------------------------------------  


//edit get all data by id starts--------------------------------------------
 
  const { data: userDataById, error: userDataError, isLoading: isUserDataLoading,refetch:newGetIdData } = useGetUserByIdQuery(getId);
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

//edit get all data by id ends--------------------------------------------  
  
//update the data after get all data by id------------------------------------------
  const [updateData] = useUpdatePostMutation();
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
      newGetIdData();
     console.log(updatedUser, "Updated user data");
    } catch (error) {
      console.error(error);
    }
  };
//update the data after get all data by id ends------------------------------------------  


  const mainAdd =()=>{
    setIsFlyoutVisible((visible) => !visible);
    setIsEdit(false);
  }
    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout
                type="push"
                size="s"
                onClose={() => setIsFlyoutVisible(false)}
                
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                       {!isEdit? <h2>Add New User</h2>: <h2>Add Update User</h2>}
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiFlexGroup  justifyContent="flexStart">
                        <EuiFlexItem grow={false} >
                            <EuiFieldText type="text" placeholder="enter first name ..." name="firstName"  onChange={handleInputs} value={createUser.firstName} />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiFieldText type="text" placeholder="enter last name ..." name="lastName"  onChange={handleInputs} value={createUser.lastName} />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false} >
                            <EuiFieldText type="email" placeholder="enter email ..." name="email"  onChange={handleInputs} value={createUser.email}/>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false} >
                            {!isEdit ?  <EuiButton fill size="s" color="success" onClick={handleAdd}>Add +</EuiButton> : <EuiButton fill size="s" color="success" onClick={handleUpdate}>Update +</EuiButton>  }
                          
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlyoutBody>
                <EuiFlyoutFooter>
                    <EuiButton onClick={() => setIsFlyoutVisible(false)}>Close</EuiButton>
                </EuiFlyoutFooter>
            </EuiFlyout>
        );
    }
    return (
        <div>
            <EuiButton className='flyOutButton' fill onClick={mainAdd}>
                Add +
            </EuiButton>
            {flyout}
        </div>
    );
};