import * as Print from "expo-print";
import * as FileSystem from "expo-file-system/legacy";
export async function createPDF(
  title: string,
  content: string
): Promise<string> {
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 32px;
          }

          h1 {
            text-align: center;
          }

          p {
            margin-top: 24px;
            font-size: 16px;
            line-height: 1.6;
            white-space: pre-wrap;
          }
        </style>
      </head>

      <body>
        <h1>${title}</h1>

        <p>${content}</p>
      </body>
    </html>
  `;

  // Generate a temporary PDF
  const { uri } = await Print.printToFileAsync({
    html,
  });

  // Save it permanently
  const fileName = `${Date.now()}.pdf`;

  const newUri = FileSystem.documentDirectory + fileName;

  await FileSystem.copyAsync({
    from: uri,
    to: newUri,
  });

  return newUri;
}