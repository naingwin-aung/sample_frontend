import api from "../../axios";

export const paymentSuccessFetch = async (booking_number: string) => {
    const response = await api.get('/bookings/' + booking_number);
    return response.data.data;
};
