import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GrayBackground from "../components/global/GrayBackground";
import Container from "../components/global/Container";
import { useQuery } from "@tanstack/react-query";
import { paymentSuccess } from "../api/checkout/payment-success";

const PaymentSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { booking_number } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    ...paymentSuccess(booking_number as string),
  });

  return (
    <GrayBackground>
      <Container className="mt-5">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading booking details.</p>}

        <section className="">{JSON.stringify(booking)}</section>
      </Container>
    </GrayBackground>
  );
};

export default PaymentSuccess;
