import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './NonPlayerChar.css';

const NonPlayerChar = (props) => {
  const { image, name, description, goals, quests,
    level, race, alignment, area, standing
  } = props;

  const areaJSX = <div>{ area.name }<br /><span>{ area.region }</span></div>;
  const imgStyle = {
    backgroundImage: image,
    backgroundPosition: 'top',
    backgroundSize: 'cover'
  };

  const tooltipStyle = {
    backgroundImage: area.bgImage,
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
  }

  let [isToggleOn, setToggle] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title style={ tooltipStyle }>{ areaJSX }</Popover.Title>
      <Popover.Content>
        { area.description }
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="NPC" onClick={ () => setToggle(!isToggleOn) }>
      <div className="NPC__info">
        <div className="NPC__image" style={ imgStyle }>

        </div>
        <div className="NPC__info__header">
          <div className="NPC__info__header__level">
            { level }
          </div>
          <div className="NPC__info__header__name">
            { name }
          </div>
          <div className="NPC__info__header__race">
            { race }
          </div>
          <div className="NPC__info__header__alignment">
            { alignment }
          </div>
          <div className="NPC__info__header__standing">
            { standing }
          </div>
          <OverlayTrigger trigger="hover" placement="right" overlay = { popover }>
            <div className="NPC__info__header__area">
              { area.name }
            </div>
          </OverlayTrigger>
        </div>
      </div>
      { isToggleOn &&
        <div className="NPC__info__details">
          <div className="NPC__info__details__description">
            { description }
          </div>
        { goals &&
          <div className="NPC__info__details__goals">
            Goals<br /> { goals }
          </div>
        }
        { quests &&
          <div className="NPC__info__details__quests">
            Quests<br /> { quests }
          </div>
        }
        </div>
      }
    </div>
  );
}

export default NonPlayerChar;
