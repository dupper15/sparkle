import React, { useState } from 'react';
import { useDraggable, DragOverlay } from '@dnd-kit/core';

/* eslint react/prop-types: 0 */
const Text = ({ drag }) => {
	const [draggingText, setDraggingText] = useState(null);

	const handleDragStart = (text) => {
		const textWithComponentType = { ...text, type: 'Text' };
		setDraggingText(textWithComponentType);
		drag(textWithComponentType);
	};

	const TextPalette = ({ onDragStart }) => {
		const { attributes, listeners, setNodeRef } = useDraggable({
			id: 'text',
		});

		return (
			<div className='grid grid-cols-1 gap-2'>
				<div
					ref={setNodeRef}
					style={{
						backgroundColor: 'transparent',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
					}}
					{...listeners}
					{...attributes}
					onMouseDown={() => onDragStart({ content: 'Add new text' })}
					className='bg-transparent border-2 cursor-pointer w-full  hover font-semibold text-xl h-max px-4 py-2 rounded-md text-x1 dark:text-slate-300 border-[#3c3c3d] hover:bg-gray-200 text-black'
				>
					<h2>Add new text</h2>
				</div>
			</div>
		);
	};

	return (
		<div>
			<TextPalette onDragStart={handleDragStart} />
			<DragOverlay>
				{draggingText ? <div className='text-xl text-slate-700  text-center'>{draggingText.content}</div> : null}
			</DragOverlay>
		</div>
	);
};

export default Text;
