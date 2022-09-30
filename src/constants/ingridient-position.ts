type IngredientPosition = {
   [index in "TOP" | "BOTTOM"]: string
}

const INGRIDIENT_POSITION: IngredientPosition = {
   TOP: 'top',
   BOTTOM: 'bottom'
}

export { INGRIDIENT_POSITION }

