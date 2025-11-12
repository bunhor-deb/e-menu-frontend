import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="py-4 flex justify-center font-primary items-center">
      Thank You!{" "}
      <FontAwesomeIcon icon={faHeart} className="w-5 text-red-600 mx-1" />{" "}
      {/* <a
        href="#"
        target="#"
        rel="#"
        className="text-palette-primary font-bold px-1"
      ></a> */}
    </footer>
  );
}

export default Footer;
