import Container from '../container/Container';
import BreadCrumbButton from '../Shared/BreadCrumbButton';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

const description =
  'Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita.';

const ContactBanner = () => {
  return (
    <div>
      <Container>
        <div>
          <div className="w-full h-100 flex flex-col justify-start items-start gap-10 mt-22 md:mt-14 lg:mt-26">
            <SecHeader
              header="Contact"
              className="uppercase flex flex-col items-center gap-6 md:flex-row md:items-center  md:gap-3 text-white tracking-wide"
            />

            <SecMainHeader
              className="text-white text-5xl md:text-6xl lg:text-7xl text-start font-extrabold tracking-wider "
              content={'Contact'}
            />

            <SecDescription
              className="text-[#b3c2c9] w-full md:w-1/2 lg:w-1/3 text-start font-light tracking-wider leading-7"
              content={description}
            />

            <div className="">
              <BreadCrumbButton />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactBanner;
