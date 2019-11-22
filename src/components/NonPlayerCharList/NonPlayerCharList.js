import React from 'react';
import NonPlayerChar from '../NonPlayerChar/NonPlayerChar';
import SortLink from '../../containers/SortLink/SortLink';
import { SortColumn } from '../../store/modules/npcs/actions';
import './NonPlayerCharList.css';

const NonPlayerCharList = ({ npcs }) => {
  const NPCsJSX = [];
  npcs.forEach((npc, key) => {
    const currentNPC = (
        <NonPlayerChar
          key = { key }
          image = { npc.image }
          name = { npc.name }
          race = { npc.race }
          class_ = { npc.class_ }
          level = { npc.level }
          alignment = { npc.alignment }
          area = { npc.area[0] }
          description = { npc.description }
          goals = { npc.goals }
          quests = { npc.quests }
          standing = { npc.standing }
        />
    );

    NPCsJSX.push(currentNPC);
  });
  return (
    <div>
      <div className="NonPlayerCharList__header">
        <div className="NonPlayerCharList__header__image">

        </div>
        <div className="NonPlayerCharList__header__info">
          <div className="NonPlayerCharList__header__info__level">
            <SortLink column={ SortColumn.SORT_LEVEL }>CR<span>&#9662;</span></SortLink>
          </div>
          <div className="NonPlayerCharList__header__info__name">
            <SortLink column={ SortColumn.SORT_NAME }>Name<span>&#9662;</span></SortLink>
          </div>
          <div className="NonPlayerCharList__header__info__race">
            <SortLink column={ SortColumn.SORT_RACE }>Race<span>&#9662;</span></SortLink>
          </div>
          <div className="NonPlayerCharList__header__info__alignment">
            <SortLink column={ SortColumn.SORT_ALIGNMENT }>Alignment<span>&#9662;</span></SortLink>
          </div>
          <div className="NonPlayerCharList__header__info__standing">
            <SortLink column={ SortColumn.SORT_STANDING }>Standing<span>&#9662;</span></SortLink>
          </div>
          <div className="NonPlayerCharList__header__info__location">
            <SortLink column={ SortColumn.SORT_LOCATION }>Location<span>&#9662;</span></SortLink>
          </div>
        </div>
      </div>
      { NPCsJSX }
    </div>
  );
}

export default NonPlayerCharList;
