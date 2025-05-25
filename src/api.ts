import axios from 'axios';
import { MessageDto, NewMessageDto } from './types.js';

const API_BASE_URL = 'http://localhost:8080/v1/api/messages';

export const getMessages = async (): Promise<MessageDto[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addMessage = async (newMessage: NewMessageDto): Promise<MessageDto> => {
  const response = await axios.post(API_BASE_URL, newMessage);
  return response.data;
};
