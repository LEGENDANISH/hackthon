import React from "react";
import { ExternalLink } from "lucide-react";

const schemes = [
  { name: "PM-KISAN", url: "https://pmkisan.gov.in/" },
  { name: "PMFBY", url: "https://pmfby.gov.in/" },
  { name: "PMKSY", url: "https://pmksy.gov.in/" },
  { name: "AIF", url: "https://agriinfra.dac.gov.in/" },
  
  { name: "RKVY", url: "https://rkvy.nic.in/" },
  { name: "PM-KMY", url: "https://pmkmy.gov.in/" },
  { name: "ACABC", url: "https://www.manage.gov.in/" },
  
];

export const CropStatus = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
        Government Schemes
      </h3>

      {/* Stacked Scheme Names */}
      <div className="space-y-2">
        {schemes.map((scheme, idx) => (
          <a
            key={idx}
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition"
          >
            <span>{scheme.name}</span>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CropStatus;  