// For external API calls
const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  // Store contact firstname, configured as propertiesToSend in crm-card.json
  const { firstname } = context.propertiesToSend;

  const introMessage = {
    type: "heading",
    text: "Let's brighten up your day!",
  };
  try {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");

    const tileSections = [
      {
        type: "text",
        format: "markdown",
        text: `**${firstname} would like this dog!**`,
      },
      {
        type: "image",
        src: data.message,
        alt: "A cute dog",
      },
      {
        type: "button",
        text: "Get new dog",
        onClick: {
          type: "SERVERLESS_ACTION_HOOK",
          serverlessFunction: "crm-card",
        },
      },
    ];

    sendResponse({
      sections: [...tileSections],
    });
  } catch (error) {
    // "message" will create an error feedback banner when it catches an error
    sendResponse({
      message: {
        type: "ERROR",
        body: `Error: ${error.message}`,
      },
      sections: [introMessage],
    });
  }
};
