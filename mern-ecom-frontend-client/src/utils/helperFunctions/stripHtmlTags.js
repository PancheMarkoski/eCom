// helpers.js

// Function to remove HTML tags from a string
export const stripHtmlTags = (str) => {
  if (!str) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = str;
  return tempDiv.textContent || tempDiv.innerText || "";
};
