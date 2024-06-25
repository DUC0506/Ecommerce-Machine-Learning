/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { getUser, updateUserToSeller } from "../api/user";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/loading.gif";

const SellerForm = () => {
  const navigate = useNavigate();
  const { authInfo, handleLogout } = useAuth();
  const [step, setStep] = useState(0);
  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    email: "",
  });

  const [taxInfo, setTaxInfo] = useState({
    taxAddress: "",
    taxEmail: "",
    taxId: "",
  });

  const [identityInfo, setIdentityInfo] = useState({
    idCard: "",
    nameCard: "",
  });
  const fetchUser = async () => {
    const { type, user } = await getUser(authInfo.profile._id);
    if (type === "Success") {
      setTaxInfo({
        ...taxInfo,
        taxAddress: user.address,
        taxEmail: user.email,
      });
      setSellerInfo(user);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(taxInfo);
  console.log(identityInfo);

  const handleSaveSeller = async () => {
    const taxAndCard = {
      taxAddress: taxInfo.taxAddress,
      taxEmail: taxInfo.taxEmail,
      taxId: taxInfo.taxId,
      cardId: identityInfo.idCard,
      cardName: identityInfo.nameCard,
    };
    await updateUserToSeller(taxAndCard);
    navigate(`/signIn`);
    handleLogout();
  };

  const handleChange = (e, infoType) => {
    const { name, value } = e.target;

    switch (infoType) {
      case "sellerInfo":
        setSellerInfo({ ...sellerInfo, [name]: value });
        break;
      case "taxInfo":
        setTaxInfo({ ...taxInfo, [name]: value });
        break;
      case "identityInfo":
        setIdentityInfo({ ...identityInfo, [name]: value });
        break;
      default:
        break;
    }
  };

  const renderForm = () => {
    if (step === 0) {
      setTimeout(function () {
        setStep(1);
      }, 8000);
    }
    switch (step) {
      case 0:
        return (
          <div className="w-full flex justify-center">
            <img src={Loading} alt="12" className="w-2/3" />
          </div>
        );
      case 1:
        return (
          <div className="w-full">
            <h2 className="font-sans text-xl font-semibold">
              Seller information
            </h2>
            <div className="font-sans mt-2">Seller name</div>
            <input
              type="text"
              name="name"
              value={sellerInfo.name}
              onChange={(e) => handleChange(e, "sellerInfo")}
              placeholder="Tên nhà bán hàng"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="font-sans mt-2">Email</div>
            <input
              type="email"
              name="email"
              value={sellerInfo.email}
              onChange={(e) => handleChange(e, "sellerInfo")}
              placeholder="Email"
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="flex w-full">
              <div className="w-1/2 mr-2">
                <div className="font-sans mt-2">Address </div>
                <input
                  type="text"
                  name="address"
                  value={sellerInfo.address}
                  onChange={(e) => handleChange(e, "sellerInfo")}
                  placeholder="Address seller"
                  className="w-full mt-4 mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
                />
              </div>

              <div className="w-1/2 ">
                <div className="font-sans mt-2">Apartment name</div>
                <input
                  type="text"
                  name="apartment"
                  value={sellerInfo.apartment?.name}
                  onChange={(e) => handleChange(e, "sellerInfo")}
                  placeholder="Tên khu chung cư"
                  className="w-full my-4  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
                />
              </div>
            </div>
            <div className="font-sans mt-2">Phone</div>
            <input
              type="phone "
              name="sdt"
              value={sellerInfo.phone}
              onChange={(e) => handleChange(e, "sellerInfo")}
              placeholder="Số điện thoại"
              className="w-full  mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="font-sans font-semibold">Tax information</h2>
            <div className="mt-4 font-sans">Business type</div>
            <input
              type="text"
              name="taxId"
              value="Cá nhân"
              onChange={(e) => handleChange(e, "taxInfo")}
              className="w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="font-sans mt-4">Business registration address</div>
            <input
              type="text"
              name="taxAddress"
              value={taxInfo.taxAddress}
              onChange={(e) => handleChange(e, "taxInfo")}
              placeholder="Mã số thuế"
              className="w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="mt-4 font-sans">Email to receive notifications</div>
            <input
              type="text"
              name="taxEmail"
              value={taxInfo.taxEmail}
              onChange={(e) => handleChange(e, "taxInfo")}
              placeholder="Mã số thuế"
              className="w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="mt-4 font-sans">Tax code</div>
            <input
              type="text"
              name="taxId"
              value={taxInfo.taxId}
              onChange={(e) => handleChange(e, "taxInfo")}
              placeholder="tax code"
              className="w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />

            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="font-sans font-semibold">
              Identification information
            </h2>
            <div className="mt-4 font-sans">Citizen identification number</div>
            <input
              type="text"
              name="idCard"
              value={identityInfo.idCard}
              onChange={(e) => handleChange(e, "identityInfo")}
              placeholder="Số CMND/CCCD"
              className="w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            <div className="mt-4 font-sans">Full name</div>
            <input
              type="text"
              name="nameCard"
              value={identityInfo.nameCard}
              onChange={(e) => handleChange(e, "identityInfo")}
              placeholder="Nguyen Van A"
              className="w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans"
            />
            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg h-3/4 my-4 ">
      <form className="">
        {renderForm()}
        <div className="flex justify-between mt-4">
          {step !== 1 && step !== 0 && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 font-sans text-gray-800 font-bold py-2 px-4 rounded"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {step !== 3 && step !== 0 ? (
            <button
              type="button"
              className="bg-yellow-400 hover:bg-yellow-500 ml-auto text-white font-bold py-2 px-4 rounded font-sans"
              onClick={nextStep}
            >
              Next
            </button>
          ) : step !== 0 ? (
            <button
              type="button"
              onClick={() => handleSaveSeller()}
              className="bg-yellow-500 hover:bg-yellow-600 font-sans text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
