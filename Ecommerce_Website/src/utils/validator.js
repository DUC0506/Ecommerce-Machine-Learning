import { useNotification } from "../hooks";

const useValidation = () => {
  const { updateNotification } = useNotification();
  const validateFields = (userInfo) => {
    if (!userInfo.name) {
      updateNotification("error", "Name not found");
      return false;
    }
    if (!userInfo.username) {
      updateNotification("error", "Username not found");
      return false;
    }
    if (!userInfo.email) {
      updateNotification("error", "Email not found");
      return false;
    }
    if (!userInfo.password) {
      updateNotification("error", "Password not found");
      return false;
    }
    if (userInfo.password.length < 8) {
      updateNotification(
        "error",
        "Password must be at least 8 characters long"
      );
      return false;
    }
    if (
      !userInfo.password.match(/\d/) ||
      !userInfo.password.match(/[a-zA-Z]/)
    ) {
      updateNotification(
        "error",
        "Password must contain at least one letter and one number"
      );
      return false;
    }
    if (!userInfo.passwordConfirmation) {
      updateNotification("error", "Password confirmation not found");
      return false;
    }

    if (userInfo.password !== userInfo.passwordConfirmation) {
      updateNotification("error", "Passwords do not match");
      return false;
    }
    // Additional validation checks can be added here (e.g., email format, password strength)
    return true;
  };
  const validateSignIn = (userInfo) => {
    console.log(userInfo);
    if (!userInfo.email) {
      updateNotification("error", "Email not found");
      return false;
    }
    if (!userInfo.password) {
      updateNotification("error", "Password not found");
      return false;
    }

    return true;
  };

  const validateProduct = (productData) => {
    if (!productData.name) {
      updateNotification("error", "Product name not found");
      return false;
    }
    if (!productData.category) {
      updateNotification("error", "Category not found");
      return false;
    }
    if (!productData.description) {
      updateNotification("error", "Description not found");
      return false;
    }
    if (!productData.price) {
      updateNotification("error", "Price not found");
      return false;
    }
    if (isNaN(productData.price) || productData.price <= 0) {
      updateNotification("error", "Price must be a positive number");
      return false;
    }
    if (productData.priceDiscount && isNaN(productData.priceDiscount)) {
      updateNotification("error", "Discount price must be a number");
      return false;
    }
    if (!productData.colors) {
      updateNotification("error", "Colors not found");
      return false;
    }
    if (!productData.sizes) {
      updateNotification("error", "Sizes not found");
      return false;
    }

    if (!productData.priceSizes) {
      updateNotification("error", "Price according to not found");
      return false;
    }
    if (!productData.quantity) {
      updateNotification("error", "Quantity not found");
      return false;
    }
    if (productData.images.length <= 0) {
      updateNotification("error", "Images not found");
      return false;
    }
    if (isNaN(productData.quantity) || productData.quantity < 0) {
      updateNotification("error", "Quantity must be a non-negative number");
      return false;
    }
    if (!productData.mainImage) {
      updateNotification("error", "Main image not found");
      return false;
    }
    // Additional validation checks can be added here (e.g., validate image URLs, etc.)
    return true;
  };

  const validateExpense = (expenseData) => {
    if (!expenseData.name) {
      updateNotification("error", "Expense name not found");
      return false;
    }
    if (!expenseData.typeExpense) {
      updateNotification("error", "Expense type not found");
      return false;
    }
    if (!expenseData.amount) {
      updateNotification("error", "Amount not found");
      return false;
    }
    if (isNaN(expenseData.amount) || expenseData.amount <= 0) {
      updateNotification("error", "Amount must be a positive number");
      return false;
    }
    if (!expenseData.description) {
      updateNotification("error", "Description not found");
      return false;
    }
    // Additional validation checks can be added here
    return true;
  };

  const validateNews = (newsData) => {
    if (!newsData.title) {
      updateNotification("error", "News title not found");
      return false;
    }
    if (!newsData.content) {
      updateNotification("error", "News content not found");
      return false;
    }
    if (!newsData.apartment) {
      updateNotification("error", "Apartment not found");
      return false;
    }
    // Additional validation checks can be added here
    return true;
  };

  return {
    validateFields,
    validateSignIn,
    validateProduct,
    validateExpense,
    validateNews,
  };
};

export default useValidation;
