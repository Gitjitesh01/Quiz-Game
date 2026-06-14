import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './matching.css'
import _ from 'lodash';

export default function Matching({ questions, setMatchingAnswer, getCurrentQuestion, selectedOptions }) {
    const [characters, updateCharacters] = useState([]);

    // Update characters whenever the current question changes
    useEffect(() => {
        const questionOptions = getCurrentQuestion().options;
        const shuffledArray = _.shuffle(questionOptions);
        updateCharacters(shuffledArray);
    }, [getCurrentQuestion()]); // Dependency array makes sure to run when the question changes

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);

        const answer = items.map((item) => item.id);
        console.log("Match ans", answer);
        setMatchingAnswer(answer);
        console.log("New match ans");
    }

    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm text-gray-500 -mt-4 font-medium">
                Drag and drop the Right Side Options vertically to match the correct answer
            </span>
            <div className='flex space-x-5'>
                <div className='flex flex-col'>
                    {getCurrentQuestion().options.map((option) => (
                        <div key={option.id} className=" m-2 p-2 flex items-center">
                            <div
                                className=' bg-white p-5 border-[1px] border-black'
                                value={option.text}
                                checked={selectedOptions[getCurrentQuestion().id] === option.id}
                            >
                                {option.text}
                            </div>
                            <span className='text-lg ml-2 font-bold'>&#8594;</span>
                        </div>
                    ))}
                </div>
                <div className="DBox">
                    <header className="DBox-header">
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {(provided) => (
                                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                        {characters?.map(({ selection }, index) => {
                                            return (
                                                <Draggable key={selection} draggableId={selection} index={index}>
                                                    {(provided) => (
                                                        <li className=' bg-white' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div
                                                                className=' bg-white p-5'
                                                                value={selection}
                                                            >
                                                                {selection}
                                                            </div>
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
                </div>
            </div>
        </div>
    );
}
