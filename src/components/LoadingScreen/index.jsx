import React, { memo } from "react";


const LoadingScreen = ({}) => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default memo(LoadingScreen);
