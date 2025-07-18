import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	server: {
		port: 4173,
		cors: {
			origin: "http://localhost:5000/",
			credentials: true,
		},
	},
});
