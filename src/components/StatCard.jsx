const StatCard = ({ title, value, icon }) => {

    return (

        <div
            className="
      bg-white
      p-4
      sm:p-5
      md:p-6
      rounded-2xl
      shadow
      flex
      items-center
      justify-between
      hover:shadow-lg
      transition
      duration-300
      "
        >

            {/* TEXT */}
            <div>

                <p className="
        text-gray-500
        text-xs
        sm:text-sm
        ">
                    {title}
                </p>

                <h2 className="
        text-xl
        sm:text-2xl
        md:text-3xl
        font-bold
        mt-1
        ">
                    {value}
                </h2>

            </div>


            {/* ICON */}
            <div
                className="
        bg-gray-100
        p-2
        sm:p-3
        rounded-xl
        text-gray-600
        flex
        items-center
        justify-center
        "
            >
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                    {icon}
                </div>
            </div>

        </div>

    );

};

export default StatCard;