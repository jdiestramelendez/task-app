import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'element-1',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'element-2',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'element-3',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'element-4',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'element-5',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters" direction="vertical" type="QUESTION">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((character, index) => {
                  console.log(index)
                  return (
                    <Draggable key={character.id} draggableId={character.id} index={index} type="TASK">
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} >
                          <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon={"grip-vertical"}
                              style={{ float: "left" }}
                            />
                          </span>
                          <div className="characters-thumb">
                            <img src={character.thumb} alt={`${character.name} Thumb`} />
                          </div>
                          <p>
                            { character.name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default App;