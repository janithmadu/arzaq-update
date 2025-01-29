import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const languages = ["en", "ar"]; // List of supported languages

    for (const language of languages) {
      const translations = await prisma.translation.findMany({
        where: { language },
        select: { key: true, value: true },
      });

      console.log(translations);
      

      const translationsObject = translations.reduce(
        (acc: any, { key, value }) => {
          acc["TopNav"] = acc["TopNav"] || {}; // Initialize the "TopNav" object if it doesn't exist
          acc["TopNav"][key] = value; // Add the key-value pair under "TopNav"

          return acc;
        },
        {}
      );

      // Define the file path for the JSON file
      const filePath = path.join(
        process.cwd(),
        `src/messages/${language}.json`
      );

      // Write translations into the JSON file
      fs.writeFileSync(filePath, JSON.stringify(translationsObject, null, 2));
    }

    return NextResponse.json(
      { message: "Translations updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating translations:", error);
    return NextResponse.json(
      { error: "Failed to update translations" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
