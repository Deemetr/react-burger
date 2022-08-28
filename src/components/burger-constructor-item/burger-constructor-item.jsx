import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./burger-constructor-item.module.css";
import {
  removeIngredient,
  moveIngredient,
} from "../../services/reducers/ingredients-reducer";

export default function BurgerConstructorItem(props) {
  const { ingredient, index } = props;
  const dispatch = useDispatch();
  const ref = useRef();
  const onIngredientDelete = () => {
    dispatch(removeIngredient(index));
  };

  const [, dropRef] = useDrop({
    accept: "constructor-item",
    hover: (item, monitor) => {
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
