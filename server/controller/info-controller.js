import Info from "../model/Info.js";
import client from "../config/openrouter.js";

export const addInfo = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      travelStyle,
      interests,
      notes,
    } = req.body;

    const prompt = `
You are a professional travel planner.

Create a detailed day-by-day travel itinerary.

Destination: ${destination}

Start Date: ${startDate}

End Date: ${endDate}

Travelers: ${travelers}

Budget: ${budget}

Travel Style: ${travelStyle}

Interests: ${interests.join(", ")}

Special Requirements:
${notes}

For every day include:

- Morning
- Afternoon
- Evening
- Restaurant Recommendation
- Transportation
- Estimated Cost

Make the itinerary practical and realistic.

Return only plain text.

IMPORTANT:
- Do NOT use Markdown.
- Do NOT use **.
- Do NOT use #.
- Do NOT use |.
- Do NOT use ---.
- Do NOT use bullet symbols like *.
- Use only simple readable text.

Format exactly like this:

Travel Itinerary

Day 1
Morning:
Afternoon:
Evening:
Restaurant:
Transportation:
Estimated Cost:

Day 2
...

Summary

Accommodation:
Food:
Transport:
Activities:
Total Estimated Budget:
`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI travel planner who creates detailed travel itineraries.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const itinerary =
      completion.choices[0].message.content;

    const trip = await Info.create({
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      travelStyle,
      interests,
      notes,
      itinerary,
    });

    return res.status(201).json({
      success: true,
      message: "Trip created successfully.",
      itinerary,
      trip,
    });
  } catch (error) {
    console.log("OpenRouter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};