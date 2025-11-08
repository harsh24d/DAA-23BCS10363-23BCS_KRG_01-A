import type { Express } from "express";
import { createServer, type Server } from "http";
// @ts-ignore
import { solve } from "./sudoku-solver.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sudoku solver endpoint
  app.post("/api/solve", async (req, res) => {
    try {
      const { board } = req.body;

      if (!board) {
        return res.status(400).json({
          success: false,
          message: "Board is required"
        });
      }

      const result = solve(board);
      return res.json(result);
    } catch (error) {
      console.error("Error solving Sudoku:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
