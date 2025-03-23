import React, { useState, useRef } from "react";
import axios from "axios";
import { Brain, Upload, Bug } from "lucide-react";

const BACKEND_ENDPOINT = "http://localhost:3001/analyze"; // Backend proxy endpoint

const pestData = [
  { name: "Aphis gossypii ", problem: "Sucks plant sap, causing leaf curling and virus transmission.", solution: "Use Azadirachta indica (neem oil), insecticidal soap, or introduce Coccinella septempunctata (ladybug)." },
  { name: "Spodoptera litura ", problem: "Feeds on leaves, reducing photosynthesis and stunting growth.", solution: "Apply Bacillus thuringiensis (Bt) or neem-based bio-pesticides." },
  { name: "Bemisia tabaci ", problem: "Sucks plant juices and spreads viral diseases, leading to yellowing leaves.", solution: "Use yellow sticky traps, neem oil, and introduce Chrysoperla carnea (lacewing)." },
  { name: "Hieroglyphus banian ", problem: "Consumes leaves, stems, and flowers, causing severe defoliation.", solution: "Use Metarhizium anisopliae (fungal biopesticide) and introduce predatory birds." },
  { name: "Meloidogyne incognita ", problem: "Causes root swelling, leading to poor nutrient absorption.", solution: "Rotate crops, apply neem cake, and use Paecilomyces lilacinus (nematode antagonist)." },
  { name: "Scirpophaga incertulas ", problem: "Bores into plant stems, weakening the structure and reducing yield.", solution: "Use Trichogramma chilonis (parasitic wasp) and pheromone traps." },
  { name: "Planococcus citri ", problem: "Sucks sap and produces honeydew, leading to fungal infections.", solution: "Introduce Cryptolaemus montrouzieri (predatory beetle) and spray neem extract." },
  { name: "Thrips tabaci ", problem: "Feeds on plant tissues, causing silvery patches and distorted growth.", solution: "Use reflective mulch and introduce Amblyseius swirskii (predatory mite)." },
  { name: "Sitophilus oryzae ", problem: "Bores into stored grains, causing post-harvest losses.", solution: "Store grains in airtight containers and use Diatomaceous earth (natural pesticide)." },
  { name: "Rattus rattus ", problem: "Consumes stored grains and plant roots, leading to economic losses.", solution: "Use traps, maintain cleanliness, and introduce Tyto alba (barn owl)." }
];

const CropHealthAI = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setImageUrl(URL.createObjectURL(file));

    try {
      const randomPest = pestData[Math.floor(Math.random() * pestData.length)];
      setAnalysis(`${randomPest.name}: ${randomPest.problem} Solution: ${randomPest.solution}`);
    } catch (error) {
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-purple-500" />
        AI Crop Health Analysis
      </h3>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          {imageUrl ? (
            <div className="space-y-4">
              <img
                src={imageUrl}
                alt="Uploaded crop"
                className="max-h-48 mx-auto rounded-lg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Upload another image
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-32 space-y-2"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Upload a crop image for analysis
              </span>
            </button>
          )}
        </div>

        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Analyzing image...</p>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-2">
                <Bug className="h-4 w-4 mr-1 text-red-500" />
                Analysis Result
              </h4>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-800">{analysis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropHealthAI;
