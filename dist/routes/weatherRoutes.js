"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", async (req, res, next) => {
    const response = await fetch(`${process.env.BASE_URL}/Paris,FR?key=${process.env.API_KEY}`);
    const data = await response.json();
    console.log("🚀 ~ fetched:", data);
    res.json(data);
});
router.use((req, res) => {
    res.status(404).json({ error: "Page not found" });
});
exports.default = router;
//# sourceMappingURL=weatherRoutes.js.map