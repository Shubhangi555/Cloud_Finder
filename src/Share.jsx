
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";


// Function to handle native sharing
export const handleShare = (weatherInfo) => {
  const shareText = `
    Weather in ${weatherInfo.city}:
    🌡️ Temp: ${weatherInfo.temp}°C
    ☁️ Weather: ${weatherInfo.weather}
    💧 Humidity: ${weatherInfo.humidity}%
  `;

  if (navigator.share) {
    navigator
      .share({
        title: `Weather in ${weatherInfo.city}`,
        text: shareText,
        url: window.location.href, // Optional: Include your app URL
      })
      .then(() => console.log("Shared successfully!"))
      .catch((err) => console.error("Error sharing:", err));
  } else {
    alert(`Share this weather info:\n\n${shareText}`);
  }
};

// Function to get social media share links
export const getSocialMediaLinks = (weatherInfo) => {
  const text = encodeURIComponent(
    `Weather in ${weatherInfo.city}:\n🌡️ Temp: ${weatherInfo.temp}°C\n☁️ Weather: ${weatherInfo.weather}\n💧 Humidity: ${weatherInfo.humidity}%
    Check out the weather app at: ${window.location.href}`
  );

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${text}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}`,
    instagram: `https://www.instagram.com/`, // Instagram sharing link placeholder
  };
};

// Social Media Buttons Component
export const SocialMediaButtons = ({ weatherInfo }) => {
  const socialLinks = getSocialMediaLinks(weatherInfo);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* WhatsApp Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#25D366",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={() => window.open(socialLinks.whatsapp, "_blank")}
      >
        <WhatsAppIcon style={{ marginRight: "5px" }} />
        WhatsApp
      </button>

      {/* Twitter Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1DA1F2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={() => window.open(socialLinks.twitter, "_blank")}
      >
        <TwitterIcon style={{ marginRight: "5px" }} />
        Twitter
      </button>

      {/* Instagram Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#E1306C",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={() => window.open(socialLinks.instagram, "_blank")}
      >
        <InstagramIcon style={{ marginRight: "5px" }} />
        Instagram
      </button>
    </div>
  );
};
