import Icon from '../Shared/featuresIcons/Icon';
import SecDescription from '../Shared/SecDescription';
import SecMainHeader from '../Shared/SecMainHeader';

const ContactIcons = () => {
  return (
    <div className="flex flex-col gap-10 md:flex md:flex-row md:justify-between md:gap-10 mt-10 md:mt-20 mb-20">
      <div>
        <Icon src="/assets/contact/email.png" alt="email icon" />
        <SecMainHeader
          className="text-2xl text-[#19302d] font-extrabold mt-8"
          content="Write Us"
        />
        <SecDescription
          content="jobayer.ak@gmail.com"
          className="mt-6 text-[#19302d] opacity-[0.7]"
        />
      </div>
      <div>
        <Icon src="/assets/contact/call.png" alt="call us icon" />
        <SecMainHeader
          className="text-2xl text-[#19302d] font-extrabold mt-8"
          content="Call Us"
        />
        <SecDescription
          content="+880-1814005745"
          className="mt-6 text-[#19302d] opacity-[0.7]"
        />
      </div>
      <div>
        <Icon src="/assets/contact/visit.png" alt="vistion-icons" />
        <SecMainHeader
          className="text-2xl text-[#19302d] font-extrabold mt-8"
          content="Visit Us"
        />
        <SecDescription
          content="Mymensingh, Bangladesh"
          className="mt-6 text-[#19302d] opacity-[0.7]"
        />
      </div>
    </div>
  );
};

export default ContactIcons;
