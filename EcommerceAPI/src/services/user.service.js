// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import dataUri from '../utils/datauri';
import { uploadFile, destroyFile } from '../utils/cloudinary';

// Models
import { User } from '../models/index';

/**
 * @docs    Create New User
 * @param   { Object } body - Body object data
 * @param   { Object } profileImage - User profile image
 * @returns { Object<type|message|statusCode|user> }
 */
export const createUser = catchAsync(async (body, profileImage) => {
  // 1) Check if profile image provided
  if (profileImage === undefined) {
    return {
      type: 'Error',
      message: 'profileImageRequired',
      statusCode: 400
    };
  }

  const {
    name,
    username,
    email,
    password,
    passwordConfirmation,
    role,
    apartment
  } = body;
  let { companyName, address, phone } = body;

  if (!companyName) companyName = '';
  if (!address) address = '';
  if (!phone) phone = '';

  // 2) Check required fields
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !passwordConfirmation ||
    !role ||
    !apartment ||
    profileImage.length === 0
  ) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const isEmailTaken = await User.isEmailTaken(email);

  // 3) Check if email already taken
  if (isEmailTaken) {
    return {
      type: 'Error',
      message: 'emailTaken',
      statusCode: 409
    };
  }

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Users/${name.trim().split(' ').join('')}`;

  // 5) Upload image to cloudinary
  const image = await uploadFile(
    dataUri(profileImage).content,
    folderName,
    600
  );

  // 6) Create new user
  const user = await User.create({
    name,
    username,
    email,
    password,
    passwordConfirmation,
    role,
    companyName,
    address,
    phone,
    apartment,
    profileImage: image.secure_url,
    profileImageId: image.public_id
  });

  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulSignUp',
    statusCode: 201,
    user
  };
});

/**
 * @desc    Query Users
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|users> }
 */
export const queryUsers = catchAsync(async (req) => {
  const users = await APIFeatures(req, User, 'apartment');

  // 1) Check if users doesn't exist
  if (users.length === 0) {
    return {
      type: 'Error',
      message: 'noUsersFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulUsersFound',
    statusCode: 200,
    users
  };
});

export const querySellers = catchAsync(async (req) => {
  const users = await APIFeatures(req, User, 'apartment', null);

  // 1) Check if users doesn't exist
  if (users.length === 0) {
    return {
      type: 'Error',
      message: 'noUsersFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulUsersFound',
    statusCode: 200,
    users
  };
});

/**
 * @desc    Query User Using It's ID
 * @param   { Object } id - User ID
 * @return  { Object<type|message|statusCode|user> }
 */
export const queryUser = catchAsync(async (id) => {
  const user = await User.findById(id).populate('apartment');

  // 1) Check if user doesn't exist
  if (!user) {
    return {
      type: 'Error',
      message: 'noUserFoundWithID',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send data;
  return {
    type: 'Success',
    message: 'successfulUserFound',
    statusCode: 200,
    user
  };
});

/**
 * @desc    Update User Details Using It's ID
 * @param   { Object } user - An object contains logged in user data
 * @param   { Object } body - Body object data
 * @returns { Object<type|message|statusCode|user> }
 */
export const updateUserDetails = catchAsync(async (user, body) => {
  const { id } = user;
  const { password, passwordConfirmation, email } = body;

  // 1) Check if password and passwordConfirmation are provided
  if (password || passwordConfirmation) {
    return {
      type: 'Error',
      message: 'passwordUpdateRoute',
      statusCode: 400
    };
  }

  const isEmailTaken = await User.isEmailTaken(email, id);

  // 2) Check if email taken or not
  if (email && isEmailTaken) {
    return {
      type: 'Error',
      message: 'emailTaken',
      statusCode: 409
    };
  }
  // 3) Find user document and update it
  user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulUserDetails',
    statusCode: 200,
    user
  };
});

export const addBankToUser = catchAsync(async (user, body) => {
  const { bankNumber, bankDate, bankCVV } = body;
  if (!bankNumber || !bankDate || !bankCVV) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }
  const { id } = user;
  user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        cardBank: {
          bankNumber,
          bankDate,
          bankCVV
        }
      }
    },
    {
      new: true,
      runValidators: true
    }
  );
  return {
    type: 'Success',
    message: 'successfulUserDetails',
    statusCode: 200,
    user
  };
});

export const updateUserToSeller = catchAsync(async (user, body) => {
  const { taxAddress, taxEmail, cardId, cardName } = body;
  let { taxId } = body;
  if (!taxAddress || !taxEmail || !cardId || !cardName) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }
  if (!taxId) {
    taxId = '';
  }
  if (!user) {
    return {
      type: 'Error',
      message: 'userNotFound',
      statusCode: 400
    };
  }
  if (user.role !== 'user') {
    return { type: 'Error', message: 'notUser', statusCode: 400 };
  }
  const { id } = user;
  user = await User.findByIdAndUpdate(
    id,
    {
      role: 'seller',
      tax: {
        taxAddress,
        taxEmail,
        taxId: taxId
      },
      card: {
        cardId,
        cardName
      }
    },
    {
      new: true,
      runValidators: true
    }
  );
  return {
    type: 'Success',
    message: 'successfulUserDetails',
    statusCode: 200,
    user
  };
});

/**
 * @desc    Update User Profile Image Using It's ID
 * @param   { Object } user - An object contains logged in user data
 * @param   { Object } profileImage - Updated Profile Image
 * @returns { Object<type|message|statusCode|user> }
 */
export const updateUserProfileImage = catchAsync(async (user, profileImage) => {
  // 1) Check if profile imae is provided
  if (profileImage === undefined) {
    return {
      type: 'Error',
      message: 'profileImageRequired',
      statusCode: 400
    };
  }

  const { name, profileImageId, id } = user;

  // 2) Specifiy folder name where the profile image is going to be uploaded in cloudinary
  const folderName = `Users/${name.trim().split(' ').join('')}`;

  // 3) Destroy image from cloudinary
  destroyFile(profileImageId);

  // 4) Upload image to cloudinary
  const image = await uploadFile(
    dataUri(profileImage).content,
    folderName,
    600
  );
  // 5) Find user document and update it
  user = await User.findByIdAndUpdate(
    id,
    {
      profileImage: image.secure_url,
      profileImageId: image.public_id
    },
    {
      new: true,
      runValidators: true
    }
  );

  // 6) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulUserImage',
    statusCode: 200
  };
});

/**
 * @desc    Delete User Using It's ID
 * @param   { String } id - User ID,
 * @returns { Object<type|message|statusCode> }
 */
export const deleteUser = catchAsync(async (id) => {
  const user = await User.findByIdAndDelete(id);

  // 1) Check if user doesn't exist
  if (!user) {
    return {
      type: 'Error',
      message: 'noUserFoundWithID',
      statusCode: 404
    };
  }

  // 2) Delete user profile image
  destroyFile(user.profileImageId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulUserDelete',
    statusCode: 200
  };
});

/**
 * @desc    Delete LoggedIn User Data Service
 * @param   { String } id - User ID,
 * @returns { Object<type|message|statusCode> }
 */
export const deleteMyAccount = catchAsync(async (user) => {
  const { id, profileImageId } = user;

  // 1) Delete user profile image
  destroyFile(profileImageId);

  // 2) Delete user data
  await User.findByIdAndDelete(id);

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulDeleteYourAccount',
    statusCode: 200
  };
});
