import { apiFetch } from '../utils/api';

/**
 * Sign up a business owner
 * @param businessName - The name of the business
 * @param description - A short description of the business
 * @param email - The email of the business owner
 * @param password - The password of the business owner
 * @param phone - The phone number of the business owner
 * @param address - The address of the business owner
 * @returns The API response or throws an error
 */
export const signUpBusinessOwner = async (
  businessName: string,
  description: string,
  email: string,
  password: string,
  phone: string,
  address: string
): Promise<any> => {
  try {
    const response = await apiFetch('/register/business_owner', {
      method: 'POST',
      body: JSON.stringify({
        business_name: businessName,
        description,
        email,
        password,
        phone,
        address,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};
