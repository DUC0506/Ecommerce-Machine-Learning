import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import Email from '../../assets/giphy.gif'

export default function ContactsUser({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  console.log(contacts);
  const {authInfo} = useAuth()
  useEffect(()=>{
    setCurrentUserName(authInfo.profile.username)
    setCurrentUserImage(authInfo.profile.profileImage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    console.log(contact);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="flex flex-col  h-full bg-neutral-100 shadow-xl w-1/4  ">
          <div className="flex items-center justify-center h-1/6">
            <div className="flex items-center gap-4">
              <img src={Email} alt="logo" className="h-16" />
            
            </div>
          </div>
          <div className="overflow-auto rounded mx-1 h-5/6 ">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`flex items-center py-4 cursor-pointer my-1 rounded hover:bg-yellow-500 ${
                  index === currentSelected ? "bg-yellow-500" : "bg-yellow-300"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex-shrink-0 w-6 h-6 ml-1">
                  <img
                    src={contact.profileImage}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="ml-4 text-white">
                  <h3>{contact.username}</h3>
                 {/* {contact.role ==='admin'?'':  <h3>({contact.apartment.name})</h3>}
                  {contact.role ==='admin' ? <h3>Admin</h3> : ''} */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex  items-center justify-center py-2 rounded bg-yellow-400 mt-1 ml-2 mr-2  h-1/6 ">
            <div className="flex items-center gap-4 ">
              <div className="w-8 h-8">
                <img
                  src={currentUserImage}
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="text-white font-sans">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
