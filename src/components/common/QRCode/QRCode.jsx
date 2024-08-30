import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import '../../../styles/components/ScratchCard.scss';

const QRCode = () => {
  const qrData = "https://8fa4-115-244-221-30.ngrok-free.app/scratch-card";

  return (
    <div className="d-flex justify-content-around align-items-center p-4">
      <QRCodeCanvas
        value={qrData}
        style={{ width: "130px", height: "130px" }}
      />
      <div className="cls_caption">
        Get Inspired! <br /> Scan the QR Code for Today's Quote
      </div>
    </div>
  );
};

export default QRCode;
