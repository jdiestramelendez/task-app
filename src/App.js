import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Reorder, getItemStyle, getQuestionListStyle } from "./utils";
import Answers from "./answer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';


const getQuestions = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `question-${k}`,
    content: `question ${k}`,
    answers: [`answer-1`, `answer-2`, `answer-3`]
  }));

  

function App() {
  const [questions, setQuestions ] = useState(getQuestions(5));

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(result);
      const questions = Reorder(
        this.state.questions,
        result.source.index,
        result.destination.index
      );

      setQuestions(questions);
    } else {
      console.log(result);
      const answers = Reorder(
        this.state.questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const questions = JSON.parse(JSON.stringify(this.state.questions));

      questions[result.type].answers = answers;

      setQuestions(questions);
    }
  }

  

  return (
    <DragDropContext
        onDragEnd={handleOnDragEnd}
      >
        <Droppable droppableId="droppable" type="QUESTIONS">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getQuestionListStyle(snapshot.isDraggingOver)}
            >
              {questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {question.content}
                      <span {...provided.dragHandleProps}>
                        <FontAwesomeIcon
                          icon={"grip-vertical"}
                          style={{ float: "left" }}
                        />
                      </span>
                      <Answers questionNum={index} question={question} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  );
}

export default App;