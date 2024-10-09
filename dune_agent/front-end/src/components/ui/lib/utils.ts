import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertKeysToCamelCase = (obj: any): any => {
  const toCamelCase = (str: string) =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[toCamelCase(key)] = convertKeysToCamelCase(value);
      return acc;
    }, {} as any);
  }
  return obj;
};

export const extractData = (rawString: string) => {
  const jsonString = rawString.replace(/(^```json|```$)/g, "").trim();
  try {
    const parsedData = JSON.parse(jsonString);
    return convertKeysToCamelCase(parsedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

export const isValidJsonString = (input: string): boolean => {
  // Remove any leading/trailing whitespace
  const trimmedInput = input.trim();

  // Check if the input starts and ends with the JSON formatting code block syntax
  if (trimmedInput.startsWith("```json") && trimmedInput.endsWith("```")) {
    // Remove the code block formatting
    const jsonContent = trimmedInput.slice(7, -3).trim();

    try {
      JSON.parse(jsonContent);
      return true;
    } catch (error) {
      return false;
    }
  }

  // For regular JSON strings, attempt to parse directly
  try {
    JSON.parse(trimmedInput);
    return true;
  } catch (error) {
    return false;
  }
};
