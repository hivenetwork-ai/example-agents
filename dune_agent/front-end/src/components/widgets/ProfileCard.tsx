// widgets/ProfileCard.tsx
import React from "react";
import Image from "next/image";

export interface ProfileCardProps {
  name: string;
  dob: string;
  serialNumber: string;
  status: string;
  issuedBy: string;
  operator: string;
  dateIssued: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  dob,
  serialNumber,
  status,
  issuedBy,
  operator,
  dateIssued,
}) => {
  return (
    <div className="flex flex-col font-roboto">
      <div className="profile-card bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Volunteer Criminal Record Verification
          </h1>
        </header>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <span
            className={`status px-3 py-1 rounded-full text-sm font-semibold ${
              status.toLowerCase() === "valid" || "No criminal record"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="details space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-600">
              <strong className="font-semibold">Date of Birth:</strong> {dob}
            </p>
            <p className="text-gray-600">
              <strong className="font-semibold">Serial Number:</strong>{" "}
              {serialNumber}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong className="font-semibold">Issued By:</strong> {issuedBy}
            </p>
            <p className="text-gray-600">
              <strong className="font-semibold">Operator:</strong> {operator}
            </p>
            <p className="text-gray-600">
              <strong className="font-semibold">Date Issued:</strong>{" "}
              {dateIssued}
            </p>
          </div>
        </div>
        <footer className="mt-4">
          <div className="flex justify-between">
            <img
              src="https://www.logodesignlove.com/images/country/canada-wordmark.jpg"
              alt="Government Of Canada Logo"
              className="w-[130px] h-fit mt-auto"
            />
            <img
              src="https://seeklogo.com/images/K/Kitchener-logo-53BE46BE2A-seeklogo.com.png"
              alt="City of Kitchener logo"
              className="w-[130px] h-fit mt-auto"
            />
            <img
              src="https://seeklogo.com/images/R/royal-canadian-mounted-police-logo-540A0B85EA-seeklogo.com.png"
              alt="RCMP logo"
              className="w-[130px] h-fit mt-auto"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfileCard;
