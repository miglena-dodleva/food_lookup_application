export const totalNutritionalValues = (selectedFoods) => {
  return selectedFoods.reduce(
    (totals, food) => {
      totals.kcal += food.calories * food.count;
      totals.protein += food.protein * food.count;
      totals.fat += food.fats * food.count;
      totals.carbs += food.carbs * food.count;

      return totals;
    },
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );
};
