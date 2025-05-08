import styles from "../style";
import logo from "../assets/logo.png";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section
    className={`${styles.flexCenter} ${styles.paddingY} flex-col bg-[#101920] w-full p-4`}
  >
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[14px] text-white cursor-pointer">
        © 2023. Multiverse Wallet Rectification.
      </p>
      <div className="flex justify-center items-center gap-4">
        <p className="font-poppins font-normal text-center text-xs text-white cursor-pointer">
          Terms of services
        </p>
        <p className="font-poppins font-normal text-center text-xs text-white">
          Privacy policy
        </p>
      </div>
    </div>
  </section>
);

export default Footer;
