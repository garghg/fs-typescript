import express, { type Request, type Response } from "express";
import diaryService from "../services/diaryService.ts";
import type {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types.ts";
import { Weather, Visibility } from "../types.ts";
import { newDiaryParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

router.get("/weatherOptions", (_req, res) => {
  res.send(Object.values(Weather));
});

router.get("/visibilityOptions", (_req, res) => {
  res.send(Object.values(Visibility));
});

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>,
  ) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
