import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";

import { exerciseOptions, fetchData, youTubeOptions } from "../utils/fetchData";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercisesData] = useState([]);
  const [equipmentMuscleExercises, setEquipmentMuscleExercises] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youTubeOptions
      );

      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      const equipmentMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );

      setExerciseDetail(exerciseDetailData);
      setExerciseVideos(exerciseVideosData.contents);
      setTargetMuscleExercisesData(targetMuscleExercisesData);
      setEquipmentMuscleExercises(equipmentMuscleExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideo
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentMuscleExercises={equipmentMuscleExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
