# CHAT APP - REACT + TYPESCRIPT + VITE

## TECHNICAL STACK

- React 18
- TypeScript 5
- Vite 5
- Axios 1.6

## REQUIREMENTS

- Node.js v18+
- npm 9+
- Running backend API (default: `http://localhost:8080`)

## INSTALLATION

### Clone repo:
```bash
git clone [repo-url] && cd [repo-name]
```

### Install dependencies:
```bash
npm install
```

### Start dev server:
```bash
npm run dev
```

## PROJECT STRUCTURE

```
src/
│
├── api.ts           # All API calls
├── types.ts         # Type definitions
├── main.tsx         # App entry
└── components/      # React components
    ├── Message.tsx  # Message component
    └── ...          # Other components
```

## KEY FILES

### `api.ts`
```ts
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
```

### `types.ts`
```ts
export interface MessageDto {
  id: number;
  content: string;
}

export interface NewMessageDto {
  content: string;
}
```

## IMPORTANT NOTES

- Always use `.js` extension in imports for TypeScript files:
```ts
import { MessageDto } from './types.js'; // ✅ Correct
import { MessageDto } from './types';    // ❌ Will break
```

- API base URL can be changed in `api.ts`
- Development server runs on `http://localhost:5173` by default

## BUILD & DEPLOY

### Production build:
```bash
npm run build
```

### Serve production build locally:
```bash
npm run preview
```

## TROUBLESHOOTING

If getting `"Module not found"` errors:

- Verify all imports have correct extensions (`.js`)
- Restart Vite dev server
- Check terminal for TypeScript errors

## LICENSE

MIT License
