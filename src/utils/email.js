export async function sendEmail(formDataObject) {
  const formData = new FormData();

  // Append all keys and values from formDataObject to formData
  for (const key in formDataObject) {
    formData.append(key, formDataObject[key]);
  }

  // Append access key
  formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

  // Convert to JSON object
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
