import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import ChatHeader from './ChatHeader';
import socket from '../../utils/socket';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import * as ChatService from '../../services/ChatService';
const ChatBox = ({ toggleChatBox }) => {
	const [messages, setMessages] = useState([]);
	const project = useSelector((state) => state.project);
	const user = useSelector((state) => state.user);
	const messageEndRef = useRef(null);
	const [botAnswer, setBotAnswer] = useState('');
	const [imageAnswer, setImageAnswer] = useState('');
	const mutation = useMutation({
		mutationFn: (messageData) => {
			return ChatService.sendChatBot(messageData.text, messageData.imageUrl);
		},
		onError: (error) => {
			console.log(error);
		},
		onSuccess: (data) => {
			setBotAnswer(data.data.answer || '');
			setIsLoading(false);
		},
	});
	const mutation2 = useMutation({
		mutationFn: (messageData) => {
			return ChatService.sendImageBot(messageData.text);
		},
		onError: (error) => {
			console.log(error);
		},
		onSuccess: (data) => {
			setImageAnswer(data || '');
			setIsLoading(false);
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (!project?.id) return;
		const handleLoadMessages = (loadedMessages) => {
			setMessages(loadedMessages);
		};
		socket.emit('joinRoom', project.id);
		const handleNewMessage = (newMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		};
		socket.on('loadMessages', handleLoadMessages);
		socket.on('chatMessage', handleNewMessage);

		return () => {
			socket.off('loadMessages', handleLoadMessages);
			socket.off('chatMessage', handleNewMessage);
		};
	}, [project?.id]);
	const sendMessage = async (text, imageUrl = null, isChatBot, isImageBot) => {
		if (user?.id && project?.id && (text || imageUrl)) {
			socket.emit('chatMessage', {
				userId: user.id,
				roomId: project.id,
				text,
				imageUrl,
			});
			if (isChatBot) {
				setIsLoading(true);
				mutation.mutate({ text, imageUrl });
			}
			if (isImageBot) {
				setIsLoading(true);
				mutation2.mutate({ text });
			}
		} else {
			console.error('Message or user/project data is missing!');
		}
	};

	useEffect(() => {
		if (imageAnswer && project.id) {
			socket.emit('imageReply', {
				imageAnswer,
				roomId: project.id,
			});
			console.log(imageAnswer);
		}
		setImageAnswer('');
	}, [imageAnswer, project.id]);
	useEffect(() => {
		if (botAnswer && project.id) {
			socket.emit('botReply', {
				botAnswer,
				roomId: project.id,
			});
		}
		console.log(botAnswer);
		setBotAnswer('');
	}, [botAnswer, project.id]);
	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='flex flex-col w-[400px] h-[500px] bg-[#EEEAEA] dark:bg-slate-900 dark:text-white fixed bottom-3 right-3 shadow-lg rounded-lg overflow-hidden'>
			<ChatHeader toggleChatBox={toggleChatBox} />
			<div className='flex-1 overflow-y-auto mt-2'>
				{messages.map((msg, index) => (
					<Message key={index} message={msg} isLoading={isLoading} />
				))}
				{isLoading && <Message message={{ content: 'Loading...', senderName: 'SparkleBot' }} />}
				<div ref={messageEndRef} />
			</div>
			<SendMessage addMessage={sendMessage} />
		</div>
	);
};

export default ChatBox;
