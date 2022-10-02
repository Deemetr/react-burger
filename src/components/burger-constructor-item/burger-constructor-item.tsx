import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Ingredient } from "../../models";
import {
  moveIngredient,
  removeIngredient
} from "../../services/reducers/ingredients-reducer";
import style from "./burger-constructor-item.module.css";

export default function BurgerConstructorItem({
  ingredient,
  index,
}: {
  ingredient: Ingredient;
  index: number;
}) {
  const dispatch = useDispatch<any>();
  const ref = useRef<HTMLDivElement>(null);
  const onIngredientDelete = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const [, dropRef] = useDrop({
    accept: "constructor-item",
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredIngredient = ref.current?.getBoundingClientRect();
      const ingredientCenter =
        (hoveredIngredient.bottom - hoveredIngredient.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoveredIngredient.top;

      if (dragIndex < hoverIndex && hoverClientY < ingredientCenter) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > ingredientCenter) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor-item",
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div style={{ opacity }} className={style.position} draggable ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onIngredientDelete(index)}
      />
    </div>
  );
}
