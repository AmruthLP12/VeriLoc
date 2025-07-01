"use client";
import React, { useState } from "react";
import {
  MapPin,
  CheckCircle,
  XCircle,
  Search,
  Globe,
  Navigation,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

interface AddressRecord {
  FormattedAddress: string;
  AddressLine1: string;
  AddressLine2: string;
  Locality: string;
  AdministrativeArea: string;
  PostalCode: string;
  CountryName: string;
  Latitude: string;
  Longitude: string;
  Results: string;
}

export default function AddressLookup() {
  const [a1, setA1] = useState("Linganahalli, Shivakotte, Yelahanka, ");
  const [a2, setA2] = useState("Bengaluru");
  const [postal, setPostal] = useState("560089");
  const [country, setCountry] = useState("IND");

  const [result, setResult] = useState<AddressRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const handleLookup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const params = new URLSearchParams({
        a1,
        a2,
        postal,
        ctry: country,
      });

      const res = await fetch(`/api/address?${params.toString()}`);
      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      const record = data.Records?.[0];

      if (record) {
        setResult(record);
      } else {
        setError("No address found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to validate address.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (results: string) => {
    const isValid = results.includes("AC");
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
          isValid
            ? "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-700"
            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700"
        }`}
      >
        {isValid ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        {isValid ? "Deliverable" : "Invalid / Unverified"}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl mb-6 shadow-lg text-white">
            <Globe className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Global Address Validator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Verify and standardize addresses worldwide with real-time
            validation, geocoding, and deliverability status.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-violet-600" />
              <h2 className="text-2xl font-semibold">Address Details</h2>
            </div>

            <div className="space-y-5">
              {[
                { label: "Street Address", value: a1, setValue: setA1 },
                { label: "City / Locality", value: a2, setValue: setA2 },
              ].map(({ label, value, setValue }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {label}
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Postal Code
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 10001"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Country Code
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., USA"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleLookup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4 rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validating Address...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Validate Address
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="w-5 h-5" />
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Result Card */}
          <div className="space-y-6">
            {result ? (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Validation Status</h3>
                    {getStatusBadge(result.Results)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {result.Results.includes("AC")
                      ? "This address has been verified and is deliverable."
                      : "This address could not be verified or may not be deliverable."}
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-6">
                    Standardized Address
                  </h3>
                  <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border-l-4 border-violet-500 mb-4">
                    <p className="font-medium text-lg text-violet-900 dark:text-violet-100">
                      {result.FormattedAddress}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <p>
                        <strong>Street:</strong> {result.AddressLine1}
                      </p>
                      <p>
                        <strong>Additional:</strong>{" "}
                        {result.AddressLine2 || "N/A"}
                      </p>
                      <p>
                        <strong>City:</strong> {result.Locality}
                      </p>
                      <p>
                        <strong>Region:</strong> {result.AdministrativeArea}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p>
                        <strong>Postal Code:</strong> {result.PostalCode}
                      </p>
                      <p>
                        <strong>Country:</strong> {result.CountryName}
                      </p>
                      <p className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        {result.Latitude}, {result.Longitude}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Ready to Validate
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter an address and click validate to see detailed results
                  and verification status.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width Map Section */}
        {result && result.Latitude && result.Longitude && (
          <section className="mt-12 relative">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-violet-700 dark:text-violet-300">
                  <MapPin className="w-5 h-5 text-violet-600" />
                  Location Preview on Map
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Based on Geocoordinates
                </span>
              </div>

              {/* Loader overlay */}
              {isMapLoading && (
                <div className="absolute inset-0 z-10 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div className="relative w-full h-[400px]">
                <iframe
                  src={`https://maps.google.com/maps?q=${result.Latitude},${result.Longitude}&z=16&output=embed`}
                  className="absolute inset-0 w-full h-full border-0 rounded-b-2xl"
                  loading="lazy"
                  title="Google Maps Preview"
                  onLoad={() => setIsMapLoading(false)}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
