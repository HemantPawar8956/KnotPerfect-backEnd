import { express } from "express";
import { getAllVendors } from "../controllers/vendorsController";

const vendorRoutes = express();

vendorRoutes.get("getAllVendors", getAllVendors);
