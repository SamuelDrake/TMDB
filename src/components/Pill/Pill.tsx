import { IPill } from "./types";

const Pill: React.FC<IPill> = ({
    title,
    color,
}) => {
    return (
        <div className=" bg-[#f44] text-white p-[6px] text-[12px] font-medium leading-[13px] mb-[5px] table rounded-[5px]">
            {title}
        </div>
    )
}

export default Pill;
