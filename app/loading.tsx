import { Oval } from "react-loader-spinner";
import css from "./loading.module.css";

export default function Loading() {
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#CD5B45"
        secondaryColor="#FAD7A0"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
