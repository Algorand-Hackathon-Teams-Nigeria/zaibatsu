import React from "react";

interface Props {
  variant?: "full" | "icon";
  className?: string;
}

const Logo: React.FC<Props> = ({ className, variant = "full" }) => {
  return (
    <>
      {variant === "full" ? (
        <img
          className={className}
          src="/assets/images/zaibatsu_logo.svg"
          alt="Zaibatsu"
        />
      ) : (
        <img
          className={className}
          src="/assets/images/zaibatsu_icon.png"
          alt="Zaibatsu"
        />
      )}
    </>
  );
};

export default Logo;
