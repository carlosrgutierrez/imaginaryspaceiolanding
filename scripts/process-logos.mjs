import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public/images/clients");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const input = path.join(dir, file);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum > 210) {
      data[i + 3] = 0;
    } else {
      const alpha = Math.min(255, Math.round((255 - lum) * 1.55));
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = alpha;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png()
    .toFile(path.join(dir, file.replace(".png", ".tmp.png")));

  fs.renameSync(path.join(dir, file.replace(".png", ".tmp.png")), input);
  console.log("Processed", file);
}
