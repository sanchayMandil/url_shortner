import { LinkModel } from "../models/linkModel.js";

function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export const LinkController = {
  async create(req, res) {
    let { url, code } = req.body;
    console.log("Creating link with URL:", url, "and code:", code);
    if (!url) return res.status(400).json({ error: "URL required" });

    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    if (!code) code = generateCode();

    const exists = await LinkModel.findByCode(code);
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const created = await LinkModel.create(code, url);
    return res.status(201).json(created);
  },

  async getAll(req, res) {
    res.json(await LinkModel.getAll());
  },

  async getOne(req, res) {
    const link = await LinkModel.findByCode(req.params.code);
    if (!link) return res.status(404).json({ error: "Not found" });
    res.json(link);
  },

  async remove(req, res) {
    await LinkModel.delete(req.params.code);
    res.json({ success: true });
  },

  async redirect(req, res, next) {
    const code = req.params.code;

    if (["api", "healthz"].includes(code) || code.includes(".")) {
      return next();
    }

    const link = await LinkModel.findByCode(code);
    if (!link) return res.status(404).send("Not Found");

    await LinkModel.incrementClicks(code);
    return res.redirect(302, link.url);
  }
};
