import Container from "../global/Container";

const Footer = () => {
  return (
    <div className="w-full border-t border-gray-200 pt-8 h-[150px]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
          <div className="flex flex-col gap-3">
            <div>About Me</div>
            <div className="text-xs text-gray-500">About Us</div>
            <div className="text-xs text-gray-500">Newsroom</div>
            <div className="text-xs text-gray-500">Team blog</div>
            <div className="text-xs text-gray-500">Careers</div>
            <div className="text-xs text-gray-500">Sustainability</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>Partnerships</div>
            <div className="text-xs text-gray-500">Merchant sign up</div>
            <div className="text-xs text-gray-500">Merchant log in</div>
            <div className="text-xs text-gray-500">Affiliate Partnership</div>
            <div className="text-xs text-gray-500">Influencer Program</div>
            <div className="text-xs text-gray-500">Agent Marketplace</div>
            <div className="text-xs text-gray-500">Team Partner Hub</div>
            <div className="text-xs text-gray-500">Collaborate with Team</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>About Us</div>
            <div className="text-xs text-gray-500">General terms of use</div>
            <div className="text-xs text-gray-500">Privacy policy</div>
            <div className="text-xs text-gray-500">Cookie Policy</div>
            <div className="text-xs text-gray-500">Bug Bounty Program</div>
            <div className="text-xs text-gray-500">Animal Welfare Policy</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>Payment channels</div>
            <div className="text-xs text-gray-500">Credit Card</div>
            <div className="text-xs text-gray-500">PayPal</div>
            <div className="text-xs text-gray-500">Bank Transfer</div>
            <div className="text-xs text-gray-500">Cash on Delivery</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
